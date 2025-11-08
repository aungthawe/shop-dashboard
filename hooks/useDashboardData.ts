import { fectchDashboardData } from "@/lib/api/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard-counts"],
    queryFn: () => fectchDashboardData(),
  });
}
