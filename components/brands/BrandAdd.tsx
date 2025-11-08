"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCreateBrand } from "@/hooks/useBrands";
import Link from "next/link";
import { Button } from "../ui/button";

export default function BrandAddPage() {
  const router = useRouter();

  const BrandMutation = useCreateBrand();

  const [form, setForm] = useState({
    Name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Name) {
      toast.error("Please fill all required fields");
      return;
    }

    BrandMutation.mutate(
      {
        ...form,
      },
      {
        onSuccess: () => {
          router.push("/brands");
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Add Brand</h1>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>New Brand</CardTitle>
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
                placeholder="Brand name"
              />
            </div>
            <div className="flex justify-end pt-4 gap-4">
              <Link href={`/brands`}>
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button type="submit" disabled={BrandMutation.isPending}>
                {BrandMutation.isPending ? "Saving..." : "Save Brand"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
