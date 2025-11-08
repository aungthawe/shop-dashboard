"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProduct, useUpdateProduct } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrands";
import { toast } from "sonner";
import { Product } from "@/lib/types/product";
import { Category } from "@/lib/types/category";
import { Brand } from "@/lib/types/brand";

function addIfChanged<K extends keyof Product>(
  payload: Partial<Product>,
  product: Product,
  key: K,
  newVal: string | number,
  parse?: (v: string | number) => any
) {
  const existing = product[key];
  const parsed = parse ? parse(newVal) : newVal;

  if (parsed === "" || parsed == null) {
    return; // skip empty or null
  }

  // handle number comparison separately
  if (typeof existing === "number") {
    if (!Number.isNaN(parsed) && parsed !== existing) {
      payload[key] = parsed as Product[K];
    }
    return;
  }

  if (parsed !== existing) {
    payload[key] = parsed as Product[K];
  }
}

export default function ProductEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: product, isLoading: loadingProduct } = useProduct(id);
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  const updateProduct = useUpdateProduct(id);

  const [form, setForm] = useState({
    Name: "",
    Description: "",
    Price: "",
    Stock: "",
    CategoryId: "",
    BrandId: "",
  });

  useEffect(() => {
    if (product) {
      console.log(product);
      setForm({
        Name: product.Name ?? "",
        Description: product.Description ?? "",
        Price: product.Price?.toString() ?? "",
        Stock: product.Stock?.toString() ?? "",
        CategoryId: product.CategoryId ? String(product.CategoryId) : "",
        BrandId: product.BrandId ? String(product.BrandId) : "",
      });
    }
  }, [product]);

  const handleChange = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return; // safety

    const payload: Partial<Product> = {};

    addIfChanged(payload, product, "Name", form.Name);
    addIfChanged(payload, product, "Description", form.Description);
    addIfChanged(payload, product, "Price", form.Price, (v) =>
      v === "" ? "" : parseFloat(v as string)
    );
    addIfChanged(payload, product, "Stock", form.Stock, (v) =>
      v === "" ? "" : parseInt(v as string, 10)
    );
    addIfChanged(payload, product, "CategoryId", form.CategoryId, (v) =>
      v === "" ? "" : parseInt(v as string, 10)
    );
    addIfChanged(payload, product, "BrandId", form.BrandId, (v) =>
      v === "" ? "" : parseInt(v as string, 10)
    );

    // If nothing changed, skip call
    if (Object.keys(payload).length === 0) {
      toast.message("There is no Update to commit!");
      return;
    }

    updateProduct.mutate(payload, {
      onSuccess: () => {
        router.push("/products");
      },
    });
  };

  if (!product)
    return <p className="text-red-500 text-center mt-4">Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Update Your Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                name="Name"
                value={form.Name}
                onChange={handleChange}
                placeholder="Product name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="Description"
                value={form.Description}
                onChange={handleChange}
                placeholder="Short description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="Price"
                  //defaultValue={product.Price}
                  value={form.Price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  name="Stock"
                  value={form.Stock}
                  //defaultValue={product.Stock}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={form.CategoryId || ""}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, CategoryId: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((c: Category) => (
                    <SelectItem key={c.Id} value={String(c.Id)}>
                      {c.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Brand</Label>
              <Select
                value={form.BrandId || ""}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, BrandId: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands?.map((b: Brand) => (
                    <SelectItem key={b.Id} value={String(b.Id)}>
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
              <Button type="submit" disabled={updateProduct.isPending}>
                {updateProduct.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
