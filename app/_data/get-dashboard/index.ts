/**
 * Obtém o dashboard financeiro do usuário autenticado para um mês e ano específicos.
 *
 * - Calcula totais de depósitos, investimentos e despesas.
 * - Calcula o saldo do mês.
 * - Retorna a porcentagem de cada tipo de transação em relação ao total.
 * - Lista o total gasto por categoria de despesa, incluindo porcentagem relativa.
 * - Retorna as últimas 10 transações do período.
 *
 * @param {string} month - Mês em formato "MM"
 * @param {string} [year] - Ano em formato "YYYY" (opcional, padrão: ano atual)
 * @returns {Promise<{
 *   balance: number;
 *   depositsTotal: number;
 *   investmentsTotal: number;
 *   expensesTotal: number;
 *   typesPercentage: TransactionPercentagePerType;
 *   totalExpensePerCategory: TotalExpensePerCategory[];
 *   lastTransactions: any[];
 * }>}
 * @throws {Error} Se o usuário não estiver autenticado
 */
import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { auth } from "@clerk/nextjs/server";

export const getDashBoard = async (month: string, year?: string) => {
  // Autentica usuário
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Define ano atual se não informado
  const currentYear = year || new Date().getFullYear().toString();

  // Define filtro de busca por usuário e período
  const where = {
    userId,
    date: {
      gte: new Date(`${currentYear}-${month}-01`),
      lt: new Date(`${currentYear}-${month}-31`),
    },
  };

  // Soma total dos depósitos
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  // Soma total dos investimentos
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  // Soma total das despesas
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  // Calcula saldo do mês
  const balance = depositsTotal - investmentsTotal - expensesTotal;

  // Soma total das transações do período
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  // Calcula porcentagem de cada tipo de transação
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  // Calcula total e porcentagem das despesas por categoria
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  // Busca as últimas 10 transações do período
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10,
  });

  // Retorna os dados do dashboard
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};
