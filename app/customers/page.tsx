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

async function fetchCategories() {
  const res = await api.get("/Customers");
  return res.data.value;
}

export default function CategoriesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p className="text-center">Loading customers...</p>;
  return (
    <div>
      <div className="flex justify-start items-center mb-4">
        <h2 className="text-xl font-semibold">Customer List </h2>
      </div>
      <div className="grid gap-4">
        {!isLoading && !error && (
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((c: any) => (
                    <TableRow key={c.Id}>
                      <TableCell>{c.Id}</TableCell>
                      <TableCell>{c.Name}</TableCell>
                      <TableCell>{c.Email}</TableCell>
                      <TableCell>{c.Phone}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Link href={`/customers/${c.Id}/edit`}>
                            <Button>Edit</Button>
                          </Link>
                          <DeleteButton id={c.Id} entity={"Customers"} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
