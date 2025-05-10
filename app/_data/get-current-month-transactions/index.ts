/**
 * Retorna a contagem de transações do usuário autenticado no mês atual.
 *
 * - Autentica o usuário.
 * - Se não autenticado, lança um erro "Unauthorized".
 * - Busca a quantidade de transações criadas pelo usuário no mês corrente.
 *
 * @returns {Promise<number>} Quantidade de transações no mês atual.
 * @throws {Error} Se o usuário não estiver autenticado.
 */
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

export const getCurrentMonthTransactions = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return db.transaction.count({
    where: {
      userId,
      created: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};
