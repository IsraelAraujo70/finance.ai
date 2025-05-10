"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/sheet";
import { ThemeSwitcher } from "../../_components/theme-switcher";

const MobileNavbar = ({ pathname }: { pathname: string }) => {
  return (
    <nav className="flex items-center justify-between border-b border-solid px-4 py-3 md:hidden">
      <div className="flex items-center">
        <Image src="/logo.svg" alt="agiFinance logo" width={24} height={24} />
        <h1 className="ms-2 text-xl font-bold">agiFinance</h1>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[250px] flex-col justify-between pt-12"
        >
          <div className="flex flex-col space-y-6 px-2">
            <Link
              href="/"
              className={`text-lg ${pathname === "/" ? "font-bold text-primary" : "text-muted-foreground"}`}
            >
              Dashboard
            </Link>
            <Link
              href="/transactions"
              className={`text-lg ${pathname === "/transactions" ? "font-bold text-primary" : "text-muted-foreground"}`}
            >
              Transações
            </Link>
            <Link
              href="/subscription"
              className={`text-lg ${pathname === "/subscription" ? "font-bold text-primary" : "text-muted-foreground"}`}
            >
              Assinaturas
            </Link>
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <UserButton showName />
              <ThemeSwitcher />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavbar;
