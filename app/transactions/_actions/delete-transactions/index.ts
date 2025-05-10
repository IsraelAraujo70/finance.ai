"use server";

/**
 * Exclui uma transação do banco de dados pelo seu ID.
 *
 * Revalida as rotas /transactions e / para refletir as alterações na UI.
 *
 * @param transactionId - O ID da transação a ser excluída.
 */
import { db } from "@/app/_lib/prisma";
import { deleteTransactionInput } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async ({
  transactionId,
}: deleteTransactionInput) => {
  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });
  revalidatePath("/transactions");
  revalidatePath("/");
};
