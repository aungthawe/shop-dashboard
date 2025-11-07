"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useTranslation } from "react-i18next";
// --- Fetch summary counts from OData ---
async function fetchDashboardData() {
  try {
    const [products, categories, brands, customers, orders] = await Promise.all(
      [
        api
          .get("/Products/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
        api
          .get("/Categories/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
        api
          .get("/Brands/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
        api
          .get("/Customers/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
        api
          .get("/Orders/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
      ]
    );
    return { products, categories, brands, customers, orders };
  } catch (err) {
    console.error("Fetch failed", err);
    throw err;
  }
}

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-counts"],
    queryFn: fetchDashboardData,
  });

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
