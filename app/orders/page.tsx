"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import DeleteButton from "@/components/ui/deletebutton";

async function fetchProducts() {
  const res = await api.get("/Orders?expand=Customer");
  console.log(res);
  console.log(Object.getPrototypeOf(res));

  return res.data.value;
}

export default function ProductsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders List</h2>
        <Link href="/orders/new">
          <Button>Add Order</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {!isLoading && !error && (
          <Card>
            <CardContent>
              {data && data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((p: any) => (
                      <TableRow key={p.Id}>
                        <TableCell>{p.Id}</TableCell>
                        <TableCell>{p.OrderDate}</TableCell>
                        <TableCell>{p.Customer?.Name}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Link href={`/orders/${p.Id}/edit`}>
                              <Button>Edit</Button>
                            </Link>
                            <DeleteButton id={p.Id} entity={"Orders"} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 text-center py-6">No orders yet</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
