"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

// Gerar opções de ano (atual + 5 anos para trás e 2 anos para frente)
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  // 5 anos para trás
  for (let i = currentYear - 5; i <= currentYear + 2; i++) {
    years.push({ value: i.toString(), label: i.toString() });
  }

  return years;
};

const YEAR_OPTIONS = generateYearOptions();

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const month = searchParams.get("month") || currentMonth;
  const year = searchParams.get("year") || new Date().getFullYear().toString();
  const currentYear = new Date().getFullYear().toString();

  const handleMonthChange = (newMonth: string) => {
    push(`/?month=${newMonth}&year=${year}`);
  };

  const handleYearChange = (newYear: string) => {
    push(`/?month=${month}&year=${newYear}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={(value) => handleMonthChange(value)}
        value={month}
        defaultValue={currentMonth}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleYearChange(value)}
        value={year}
        defaultValue={currentYear}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelect;
