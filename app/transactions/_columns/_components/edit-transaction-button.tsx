"use client";

import { PencilIcon } from "lucide-react";
import { Button } from "../../../_components/ui/button";
import UpsertTransactionDialog from "../../../_components/upsert-transaction-dialog";
import { useState, useCallback } from "react";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // Usando useCallback para garantir que a função não mude entre renderizações
  const handleOpenDialog = useCallback(() => {
    // Garantir que estamos usando o ID da transação atual
    setDialogIsOpen(true);
  }, [transaction.id]); // Dependência no ID da transação

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpenDialog}
        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
        // Adicionando data-transaction-id para debugging se necessário
        data-transaction-id={transaction.id}
      >
        <PencilIcon className="h-4 w-4" />
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
