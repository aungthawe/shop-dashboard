"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import { useCreateProduct } from "@/hooks/useProduct";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function AddProductPage() {
  const router = useRouter();

  const { data: categories } = useCategories();

  const { data: brands } = useBrands();

  const ProductMutation = useCreateProduct();

  const [form, setForm] = useState({
    Name: "",
    Description: "",
    Price: "",
    Stock: "",
    CategoryId: "",
    BrandId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Name || !form.CategoryId || !form.BrandId) {
      toast.error("Please fill all required fields");
      return;
    }

    ProductMutation.mutate(
      {
        ...form,
        Price: parseFloat(form.Price),
        Stock: parseInt(form.Stock),
        CategoryId: parseInt(form.CategoryId.toString()),
        BrandId: parseInt(form.BrandId.toString()),
      },
      {
        onSuccess: () => {
          router.push("/products");
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Add Product</h1>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="Name">Name</Label>
              <Input
                id="Name"
                name="Name"
                value={form.Name}
                onChange={handleChange}
                placeholder="Product name"
              />
            </div>

            <div>
              <Label htmlFor="Description">Description</Label>
              <Input
                id="Description"
                name="Description"
                value={form.Description}
                onChange={handleChange}
                placeholder="Short description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="Price">Price</Label>
                <Input
                  id="Price"
                  name="Price"
                  type="number"
                  step="0.01"
                  value={form.Price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="Stock">Stock</Label>
                <Input
                  id="Stock"
                  name="Stock"
                  type="number"
                  value={form.Stock}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label>Category</Label>
              <Select
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, CategoryId: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((c: any) => (
                    <SelectItem key={c.Id} value={c.Id.toString()}>
                      {c.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Brand</Label>
              <Select
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, BrandId: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands?.map((b: any) => (
                    <SelectItem key={b.Id} value={b.Id.toString()}>
                      {b.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-4 gap-4">
              <Link href={`/products`}>
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button type="submit" disabled={ProductMutation.isPending}>
                {ProductMutation.isPending ? "Saving..." : "Save Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
