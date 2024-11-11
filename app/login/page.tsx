import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Logo from "../_components/logo";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex h-full max-w-[550px] flex-col justify-center p-8">
        <Logo />
        <h2 className="mb-3 text-4xl font-bold leading-[39px]">Bem-vindo</h2>
        <p className="mb-8 text-muted-foreground">
          A agiFinance é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            {" "}
            <LogInIcon className="mr-2"></LogInIcon> Fazer login ou Criar conta
          </Button>
        </SignInButton>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
export default LoginPage;
