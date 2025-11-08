"use client";
import "./globals.css";
import "@/i18n";
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
          <Providers>
            <DashBoardShell>
              <div className="flex justify-end mb-2">
                <LanguageSelect />
              </div>
              {children}
            </DashBoardShell>
            <Toaster richColors position="top-right" />
          </Providers>

      </body>
    </html>
  );
}
