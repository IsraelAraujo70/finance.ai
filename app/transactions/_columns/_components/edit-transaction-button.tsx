"use client";

import { PencilIcon } from "lucide-react";
import { Button } from "../../../_components/ui/button";
import UpsertTransactionDialog from "../../../_components/upsert-transaction-dialog";
import { useState } from "react";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setDialogIsOpen(true)}>
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
