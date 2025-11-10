"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DeleteButton from "@/components/ui/deletebutton";
import { useProducts, useProductsCount } from "@/hooks/useProduct";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: products, isLoading, error } = useProducts(page, search);
  const { data: totalPages = 0 } = useProductsCount();
  const currentPage = page;
  useEffect(() => {}, [page]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products List</h2>
      </div>

      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <div className="flex justify-start gap-3 items-center">
            <input
              id="searchInput"
              type="text"
              placeholder="Search product..."
              // value={search}
              // onClick={(e) => setSearch(e.target.value)}
              className="border rounded-md px-3 py-2 w-64"
            />
            <Button
              onClick={() => {
                const value = (
                  document.getElementById("searchInput") as HTMLInputElement
                ).value;
                setSearch(value);
              }}
            >
              Search
            </Button>
            {search && (
              <Button variant={"outline"} onClick={() => setSearch("")}>
                Clear search results
              </Button>
            )}
          </div>
          <Link href="/products/add">
            <Button>Add Product</Button>
          </Link>
        </div>

        {!isLoading && !error && (
          <Card>
            <CardContent>
              <div className="h-[600px] overflow-y-auto ">
                {products?.length == 0 && (
                  <p className="py-2 px-2 text-center mt-6">
                    No Products Found!
                  </p>
                )}
                {(products?.length as number) > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products?.map((p) => (
                        <TableRow key={p.Id}>
                          <TableCell>{p.Id}</TableCell>
                          <TableCell>{p.Name}</TableCell>
                          <TableCell>{p.Description}</TableCell>
                          <TableCell>${p.Price}</TableCell>
                          <TableCell>{p.Stock}</TableCell>
                          <TableCell>{p.Category?.Name ?? "-"}</TableCell>
                          <TableCell>{p.Brand?.Name ?? "-"}</TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-end">
                              <Link href={`/products/${p.Id}/edit`}>
                                <Button>Edit</Button>
                              </Link>
                              <DeleteButton id={p.Id} entity={"Products"} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              {/* <div className="flex gap-2 mt-4 ">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div> */}

              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 border border-2 rounded-full ${
                      currentPage === i + 1
                        ? "bg-primary text-white transition-color duration-500"
                        : "bg-secondary"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
