"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBrands } from "@/hooks/useBrands";
import { useBrandStore } from "@/store/brandStore";
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
import { Brand } from "@/lib/types/brand";

export default function CategoriesPage() {
  const { search, currentPage, itemsPerPage, setSearch, setPage } =
    useBrandStore();
  const { data: brands, isLoading, error } = useBrands();
  const filtered = brands?.filter((b) =>
    b.Name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages =
    itemsPerPage > 0 ? Math.ceil((filtered?.length ?? 0) / itemsPerPage) : 0;
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered?.slice(start, start + itemsPerPage);
  //if (!brands)return <p className="text-red text-center">Loading Brands Error...</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Brand List </h2>
      </div>
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <div className="flex justify-start gap-3 items-center">
            <input
              id="searchInput"
              type="text"
              placeholder="Search Brand..."
              //value={search}
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
          <Link href="/brands/add">
            <Button>Add Brand</Button>
          </Link>
        </div>
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
                  {paginated?.map((b: Brand) => (
                    <TableRow key={b.Id}>
                      <TableCell>{b.Id}</TableCell>
                      <TableCell>{b.Name}</TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Link href={`/brands/${b.Id}/edit`}>
                            <Button>Edit</Button>
                          </Link>
                          <DeleteButton id={b.Id} entity={"Brands"} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* 📄 Pagination */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages || 1}
                </span>

                <div className="space-x-2">
                  <Button
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                    className="text-white disabled:opacity-50"
                  >
                    Prev
                  </Button>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(currentPage + 1)}
                    className="text-white disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
