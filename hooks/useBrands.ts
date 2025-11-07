import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Brand } from "@/lib/types/brand";

export function useBrands() {
  return useQuery({
    queryKey: ["Brands"],
    queryFn: async (): Promise<Brand[]> =>
      (await api.get("/Brands")).data.value,
    select: (data) => {
      return data;
    },
  });
}
