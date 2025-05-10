import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
/**
 * Manipulador de webhook do Stripe.
 *
 * Lida com eventos do Stripe:
 * - invoice.paid: Marca o usuário como premium e armazena os IDs de assinatura/cliente Stripe no Clerk.
 * - customer.subscription.deleted: Remove o plano premium e limpa os IDs de assinatura/cliente Stripe no Clerk.
 *
 * Espera que o Stripe assine as requisições usando STRIPE_WEBHOOK_SECRET.
 *
 * @rota POST /api/webhooks/stripe
 * @retorna {object} JSON { received: true } em caso de sucesso, erro 400 em caso de falha.
 */
export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw NextResponse.error();
  }
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      //Usuário pagou
      const { customer, subscription, subscription_details } =
        event.data.object;
      const clerkUserId = subscription_details?.metadata?.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }
      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
    }
    case "customer.subscription.deleted": {
      //remover plano
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      const clerkUserId = subscription.metadata.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
      break;
    }
  }
  return NextResponse.json({
    received: true,
  });
};
