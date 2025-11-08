import { toast } from "sonner";
import { api } from "../axios";

export const fectchDashboardData = async () => {
  try {
    const [products, categories, brands, customers, orders] = await Promise.all(
      [
        api
          .get("/Products/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
        api
          .get("/Categories/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
        api
          .get("/Brands/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
        api
          .get("/Customers/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
        api
          .get("/Orders/$count", { responseType: "text" })
          .then((r) => Number(r.data)),
      ]
    );
    return { products, categories, brands, customers, orders };
  } catch (e) {
    toast.error("Error Fetching DashboardData api:" + e);
    throw e;
  }
};
