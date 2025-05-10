"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "./_components/type-badge";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import EditTransactionButton from "./_components/edit-transaction-button";
import DeleteTransactionButton from "./_components/delete-transaction-button";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
    cell: ({ row: { original: transaction } }) => (
      <div className="max-w-[80px] truncate font-medium sm:max-w-none">
        {transaction.name}
      </div>
    ),
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <div className="flex justify-center">
        <TransactionTypeBadge transaction={transaction} />
      </div>
    ),
  },
  {
    id: "category",
    accessorKey: "category",
    header: () => <span className="hidden md:inline">Categoria</span>,
    cell: ({ row: { original: transaction } }) => (
      <div className="hidden md:block">
        {TRANSACTION_CATEGORY_LABELS[transaction.category]}
      </div>
    ),
  },
  {
    id: "paymentMethod",
    accessorKey: "paymentMethod",
    header: () => <span className="hidden md:inline">Metodo de pagamento</span>,
    cell: ({ row: { original: transaction } }) => (
      <div className="hidden md:block">
        {TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]}
      </div>
    ),
  },
  {
    id: "date",
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      // Formato simplificado para mobile
      const mobileDate = new Date(transaction.date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
        },
      );

      // Formato completo para desktop
      const desktopDate = new Date(transaction.date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      );

      return (
        <div className="whitespace-nowrap">
          <span className="inline sm:hidden">{mobileDate}</span>
          <span className="hidden sm:inline">{desktopDate}</span>
        </div>
      );
    },
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      const formattedAmount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount));

      return (
        <div className="whitespace-nowrap font-medium">{formattedAmount}</div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex items-center justify-center gap-0 sm:gap-1">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];
