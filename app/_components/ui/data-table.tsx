"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Estado para controlar se estamos em um dispositivo móvel
  const [isMobile, setIsMobile] = useState(false);

  // Efeito para detectar o tamanho da tela
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px é o breakpoint md no Tailwind
    };

    // Verificar inicialmente
    checkIfMobile();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Filtrar colunas com base no tamanho da tela
  const visibleColumns = columns.filter((column) => {
    if (!isMobile) return true;

    // Tentar pegar accessorKey de forma typesafe
    const accessorKey =
      typeof column.id === "string"
        ? column.id
        : "accessorKey" in column &&
            typeof (
              column as ColumnDef<TData, TValue> & { accessorKey?: string }
            ).accessorKey === "string"
          ? (column as ColumnDef<TData, TValue> & { accessorKey?: string })
              .accessorKey
          : undefined;

    return accessorKey !== "category" && accessorKey !== "paymentMethod";
  });

  const table = useReactTable({
    data,
    columns: visibleColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed md:table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap px-2 py-2 text-xs font-medium sm:px-4 sm:py-3 sm:text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => {
                    const isActionsColumn = cell.column.id === "actions";
                    return (
                      <TableCell
                        key={cell.id}
                        className={`px-2 py-1.5 text-xs sm:px-4 sm:py-3 sm:text-sm ${
                          isActionsColumn ? "text-center" : ""
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
