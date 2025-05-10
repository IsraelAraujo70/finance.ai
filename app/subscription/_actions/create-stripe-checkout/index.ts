"use server";

/**
 * Cria uma sessão de checkout do Stripe para assinatura premium.
 *
 * - Verifica autenticação do usuário.
 * - Cria uma nova sessão de checkout do Stripe no modo assinatura.
 * - Adiciona o ID do usuário Clerk como metadata na assinatura.
 *
 * @retorna {Promise<{ sessionId: string }>} O ID da sessão de checkout do Stripe.
 * @lança {Error} Se o usuário não estiver autenticado ou variáveis de ambiente estiverem ausentes.
 */
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const createStripeCheckout = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "https://agifinance.vercel.app",
    cancel_url: "https://agifinance.vercel.app",
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });
  return { sessionId: session.id };
};
