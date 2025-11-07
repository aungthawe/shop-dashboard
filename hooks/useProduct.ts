import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack";
import { toast } from "sonner";
import { Product } from "@/lib/types/product";
import {
  fetchProducts,
  fetchProduct,
  patchProduct,
  postProduct,
} from "@/lib/api/products";
import { promises } from "dns";

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}

export function useProducts(page: number, search: string) {
  return useQuery({
    queryKey: ["Products",{page,search}],
    queryFn: () => fetchProducts(page, search),
  });
}

export function useUpdateProduct(id: string) {
  return useMutation({
    mutationFn: (payload: Partial<Product>) => patchProduct(id, payload),

    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      toast.error("Failed to add product : _" + err.message);
    },
  });
}
export function useCreateProduct() {
  return useMutation({
    mutationFn: (payload: Partial<Product>) => postProduct(payload),
    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (e) => toast.error("Failed to add product" + e.message),
  });
}
