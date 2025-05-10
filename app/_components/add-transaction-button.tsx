"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction: boolean;
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // Função para fechar o diálogo e atualizar a página se necessário
  const handleDialogClose = (shouldRefresh: boolean = false) => {
    setDialogIsOpen(false);
    if (shouldRefresh) {
      // Forçar um refresh da página para garantir que a tabela seja atualizada corretamente
      window.location.reload();
    }
  };
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Adicionar transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              "Você atingiu o seu limite de transações. Atualize o seu plano para criar transações ilimitadas!"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={(isOpen) => {
          if (!isOpen) {
            // Quando o diálogo é fechado após adicionar uma transação, atualizar a página
            handleDialogClose(true);
          } else {
            setDialogIsOpen(true);
          }
        }}
      />
    </>
  );
};

export default AddTransactionButton;
