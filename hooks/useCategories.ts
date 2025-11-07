import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useCategories() {
  return useQuery({
    queryKey: ["Categories"],
    queryFn: async () => (await api.get("/Categories")).data.value,
  });
}
