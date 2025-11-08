import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchBrands } from "@/lib/api/brands";
import { toast } from "sonner";
import { queryClient } from "@/lib/tanstack";
import { postBrand } from "@/lib/api/brands";
import { Brand } from "@/lib/types/brand";

export function useBrands() {
  return useQuery({
    queryKey: ["Brands"],
    queryFn: () => fetchBrands(),
    select: (data) => {
      return data;
    },
  });
}
export function useCreateBrand() {
  return useMutation({
    mutationFn: (payload: Partial<Brand>) => postBrand(payload),
    onSuccess: () => {
      toast.success("Brand added successfully!");
      queryClient.invalidateQueries({ queryKey: ["Brands"] });
    },
    onError: (e) => toast.error("Failed to add brand" + e.message),
  });
}
