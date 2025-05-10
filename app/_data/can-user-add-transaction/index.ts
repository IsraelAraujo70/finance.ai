/**
 * Verifica se o usuário pode adicionar uma nova transação.
 *
 * - Usuários com plano "premium" podem adicionar transações ilimitadas.
 * - Usuários do plano gratuito podem adicionar até 10 transações por mês.
 *
 * @retorna {Promise<boolean>} true se o usuário puder adicionar, false caso contrário.
 * @lança {Error} Se o usuário não estiver autenticado.
 */
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }
  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
