"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "lucide-react";
import { deleteTransaction } from "../../_actions/delete-transactions";
import { toast } from "sonner";

interface DeleteTransactionButtonProps {
  transactionId: string;
}

const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  const handdleConfirmDeleteClick = async () => {
    try {
      await deleteTransaction({ transactionId });
      toast.success("Transação deletada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao deletar a transação.");
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 sm:h-9 sm:w-9"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso vai permanantemente deletar
              essa transação dos nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handdleConfirmDeleteClick}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTransactionButton;
