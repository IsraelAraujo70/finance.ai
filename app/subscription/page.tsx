import Navbar from "../_components/navbar";
import { auth, clerkClient } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon, SparklesIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";
import { cn } from "../_lib/utils";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan == "premium";
  return (
    <>
      <Navbar></Navbar>
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        <div className="animate-fade-in mb-8 text-center">
          <h1 className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text pb-2 text-3xl font-bold text-transparent md:text-4xl">
            Escolha seu Plano
          </h1>
          <p className="mt-2 text-muted-foreground">
            Selecione o plano ideal para gerenciar suas finanças
          </p>
        </div>
        <div className="flex flex-col justify-center gap-8 md:flex-row md:gap-10">
          <Card
            className={cn(
              "w-full max-w-[360px] transition-all duration-300 hover:shadow-lg md:w-[460px] md:max-w-[460px]",
              !hasPremiumPlan && "border-primary/30 ring-1 ring-primary/20",
            )}
          >
            <CardHeader className="relative border-b border-solid bg-gradient-to-b from-background to-muted/30 py-8">
              {!hasPremiumPlan && (
                <Badge className="absolute left-4 top-11 animate-pulse bg-primary/20 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="text-4xl font-light">R$ </span>
                <span className="text-6xl font-bold text-primary">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <CheckIcon className="h-5 w-5 text-primary" />
                <p className="text-sm md:text-base">
                  Apenas{" "}
                  <span className="font-semibold">
                    {currentMonthTransactions}/10
                  </span>{" "}
                  transações por mês
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <XIcon className="h-5 w-5 text-gray-400" />
                <p className="text-sm text-muted-foreground md:text-base">
                  Relatórios com IA
                </p>
              </div>
            </CardContent>
          </Card>
          <Card
            className={cn(
              "w-[360px] transition-all duration-300 hover:shadow-xl md:w-[460px]",
              hasPremiumPlan
                ? "border-primary/30 ring-2 ring-primary/30"
                : "bg-gradient-to-b from-background to-primary/5",
            )}
          >
            <CardHeader className="relative border-b border-solid bg-gradient-to-b from-background to-primary/10 py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-11 animate-pulse bg-primary/20 text-primary">
                  Ativo
                </Badge>
              )}
              <div className="absolute right-4 top-4">
                <Badge className="bg-gradient-to-r from-primary to-blue-500 font-medium text-white">
                  <SparklesIcon className="mr-1 h-3.5 w-3.5" /> Recomendado
                </Badge>
              </div>
              <h2 className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-center text-2xl font-semibold text-transparent">
                Plano Premium
              </h2>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="text-4xl font-light">R$ </span>
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-6xl font-bold text-transparent">
                  19,90
                </span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/5">
                <CheckIcon className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium md:text-base">
                  Transações <span className="font-bold">ilimitadas</span>
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-primary/5">
                <CheckIcon className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium md:text-base">
                  Relatórios com IA{" "}
                  <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    Premium
                  </span>
                </p>
              </div>
              <div className="mt-6">
                <AcquirePlanButton />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Escolha o plano que melhor atende às suas necessidades financeiras
          </p>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
