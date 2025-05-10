"use server";

/**
 * Função para criar ou atualizar uma transação no banco de dados.
 * - Valida os parâmetros recebidos usando o schema Zod.
 * - Garante que o usuário esteja autenticado.
 * - Se um ID for fornecido, faz upsert (atualiza se existir, cria se não existir).
 * - Se não houver ID, cria uma nova transação.
 * - Revalida a rota de transações após a operação.
 *
 * @param params Parâmetros da transação a ser criada ou atualizada.
 * @throws Lança erro se o usuário não estiver autenticado ou se os dados forem inválidos.
 */

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  // Valida os dados recebidos de acordo com o schema
  upsertTransactionSchema.parse(params);

  // Obtém o ID do usuário autenticado
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Se houver um ID, faz upsert (atualiza ou cria)
  if (params.id) {
    await db.transaction.upsert({
      update: { ...params, userId },
      create: { ...params, userId },
      where: {
        id: params.id ?? "",
      },
    });
  } else {
    // Se não houver ID, cria uma nova transação
    await db.transaction.create({
      data: { ...params, userId },
    });
  }

  // Revalida o cache da página de transações
  revalidatePath("/transactions");
};
