"use client";

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
import { useCategories } from "@/hooks/useCategories";

export default function CategoriesPage() {
  const { data, isLoading, error } = useCategories();
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
                      <TableCell>
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
