"use client";

import SideBar from "./SideBar";
import LanguageSelect from "../ui/languageSelect";

import { useTranslation } from "react-i18next";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [t] = useTranslation("common");
  return (
    <div className="flex min-h-screen">
      <SideBar />
      
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
