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
    <div className="relative flex min-h-screen flex-col md:grid md:h-full md:grid-cols-2">
      {/* Mobile Hero Image (background, behind content) */}
      <div className="absolute inset-0 h-64 w-full md:hidden">
        <Image
          src="/login.png"
          alt="Faça Login"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex h-full w-full max-w-full flex-col justify-center p-6 md:max-w-[550px] md:p-8">
        <Logo />
        <h2 className="mb-3 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-4xl md:leading-[39px]">
          Bem-vindo
        </h2>
        <p className="mb-8 text-base text-muted-foreground md:text-lg">
          A agiFinance é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline" className="w-full md:w-auto">
            <LogInIcon className="mr-2" /> Fazer login ou Criar conta
          </Button>
        </SignInButton>
      </div>
      {/* Desktop Hero Image */}
      <div className="relative hidden h-full w-full md:block">
        <Image
          src="/login.png"
          alt="Faça Login"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};
export default LoginPage;
