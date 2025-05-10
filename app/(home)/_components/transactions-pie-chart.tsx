"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#5B802E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionspieChartProps {
  typesPercentage: TransactionPercentagePerType;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  investmentsTotal,
  depositsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionspieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
  ];
  return (
    <Card className="flex flex-col p-4 sm:p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px] sm:max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={40}
              outerRadius="80%"
            />
          </PieChart>
        </ChartContainer>
        <div className="mt-2 space-y-2 sm:mt-4">
          <PercentageItem
            icon={
              <TrendingUpIcon
                size={14}
                className="text-primary sm:h-4 sm:w-4"
              />
            }
            title="Receitas"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={
              <TrendingDownIcon
                size={14}
                className="text-danger sm:h-4 sm:w-4"
              />
            }
            title="Despesas"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={14} className="sm:h-4 sm:w-4" />}
            title="Investimentos"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default TransactionsPieChart;
