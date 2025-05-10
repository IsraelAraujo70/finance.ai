"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcher } from "../../_components/theme-switcher";

const DesktopNavbar = ({ pathname }: { pathname: string }) => {
  return (
    <nav className="hidden justify-between border-b border-solid px-8 py-4 md:flex">
      <div className="flex items-center gap-10">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="" width={28} height={28} />
          <h1 className="ms-3 text-2xl font-bold">agiFinance</h1>
        </div>
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Assinaturas
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <UserButton showName />
      </div>
    </nav>
  );
};

export default DesktopNavbar;
