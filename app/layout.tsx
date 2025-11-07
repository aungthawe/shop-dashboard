"use client";
import "./globals.css";
import "@/i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack";
import DashBoardShell from "@/components/layout/DashBoardShell";
import { Toaster } from "sonner";
import Providers from "./provider";
import LanguageSelect from "@/components/ui/languageSelect";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Providers>
            <DashBoardShell>
              <div className="flex justify-end mb-2">
                <LanguageSelect />
              </div>
              {children}
            </DashBoardShell>
            <Toaster richColors position="top-right" />
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
