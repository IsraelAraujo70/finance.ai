import { z } from "zod";

export const deleteTransactionSchema = z.object({
  transactionId: z.string().uuid(),
});

export type deleteTransactionInput = z.infer<typeof deleteTransactionSchema>;
