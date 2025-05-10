import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashBoard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
import { ScrollArea } from "../_components/ui/scroll-area";

interface HomeProps {
  searchParams: {
    month: string;
    year?: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const currentYear = new Date().getFullYear().toString();

  const monthIsInvalid = !month || !isMatch(month, "MM");
  const yearIsInvalid = year && !/^\d{4}$/.test(year);

  if (monthIsInvalid || yearIsInvalid) {
    redirect(`?month=${currentMonth}&year=${currentYear}`);
  }
  const dashboard = await getDashBoard(month, year);
  const userCanAddTransactions = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">DashBoard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              year={year || new Date().getFullYear().toString()}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <ScrollArea>
            <div className="flex flex-col gap-6 overflow-hidden">
              <SummaryCards
                month={month}
                year={year || new Date().getFullYear().toString()}
                {...dashboard}
                UserCanAddTransaction={userCanAddTransactions}
              />
              <div className="grid grid-cols-3 grid-rows-1 gap-6">
                <TransactionsPieChart {...dashboard} />
                <ExpensesPerCategory
                  expensesPerCategory={dashboard.totalExpensePerCategory}
                />
              </div>
            </div>
          </ScrollArea>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
