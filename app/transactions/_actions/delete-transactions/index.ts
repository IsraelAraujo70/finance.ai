"use server";

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
