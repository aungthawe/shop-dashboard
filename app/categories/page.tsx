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
  const res = await api.get("/Categories");
  return res.data.value;
}

export default function CategoriesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p className="text-center">Loading categories...</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Category List </h2>
        <Link href={"/categories/new"}>
          <Button>Add Category</Button>
        </Link>
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((c: any) => (
                    <TableRow key={c.Id}>
                      <TableCell>{c.Id}</TableCell>
                      <TableCell>{c.Name}</TableCell>
                      <TableCell >
                        <div className="flex gap-2 justify-end">
                          <Link href={`/categories/${c.Id}/edit`}>
                            <Button>Edit</Button>
                          </Link>
                          <DeleteButton id={c.Id} entity={"Categories"} />
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
