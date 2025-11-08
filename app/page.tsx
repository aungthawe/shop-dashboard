"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useTranslation } from "react-i18next";
import { useDashboardData } from "@/hooks/useDashboardData";


export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardData()

  const { t } = useTranslation("common");

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <h1 className="text-xl font-semibold mb-4">{t("welcome")}</h1>
      {isLoading && <p>Loading...</p>}
      {error && (
        <p className="text-red-600">Error loading data {error.message}</p>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{data?.products ?? 0}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{data?.categories ?? 0}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Brands</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{data?.brands ?? 0}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{data?.customers ?? 0}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{data?.orders ?? 0}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
