import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "./_components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { PremiumChat } from "./_components/premium-chat";
const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "agiFinance",
  description: "Plataforma de gestão financeira com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${mulish.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            <div className="flex h-full flex-col overflow-hidden">
              {children}
              <PremiumChat />
            </div>
          </ClerkProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
