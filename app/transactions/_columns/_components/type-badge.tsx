import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TrasactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TrasactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted px-1.5 py-0.5 text-xs font-medium text-primary hover:bg-muted sm:px-2 sm:py-1 sm:text-sm sm:font-bold">
        <CircleIcon className="mr-1 fill-primary sm:mr-2" size={8} />
        <span className="hidden sm:inline">Depósito</span>
        <span className="inline sm:hidden">Depósit</span>
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 px-1.5 py-0.5 text-xs font-medium text-danger sm:px-2 sm:py-1 sm:text-sm sm:font-bold">
        <CircleIcon className="mr-1 fill-danger sm:mr-2" size={8} />
        <span className="hidden sm:inline">Despesa</span>
        <span className="inline sm:hidden">Desp</span>
      </Badge>
    );
  }
  return (
    <Badge className="bg-white bg-opacity-10 px-1.5 py-0.5 text-xs font-medium text-white sm:px-2 sm:py-1 sm:text-sm sm:font-bold">
      <CircleIcon className="mr-1 fill-white sm:mr-2" size={8} />
      <span className="hidden sm:inline">Investimento</span>
      <span className="inline sm:hidden">Invest</span>
    </Badge>
  );
};
export default TransactionTypeBadge;
