import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

/**
 * API route para verificar se o usuário atual tem plano premium
 * @returns {Object} Objeto com propriedade isPremium indicando se o usuário tem plano premium
 */
export async function GET() {
  try {
    // Obter o ID do usuário autenticado
    const { userId } = await auth();

    // Se não houver usuário autenticado, retornar não premium
    if (!userId) {
      return NextResponse.json({ isPremium: false });
    }

    // Buscar os dados do usuário
    const user = await clerkClient.users.getUser(userId);

    // Verificar se o usuário tem plano premium
    const isPremium = user.publicMetadata.subscriptionPlan === "premium";

    // Retornar o status premium
    return NextResponse.json({ isPremium });
  } catch (error) {
    console.error("Erro ao verificar status premium:", error);
    return NextResponse.json({ isPremium: false }, { status: 500 });
  }
}
