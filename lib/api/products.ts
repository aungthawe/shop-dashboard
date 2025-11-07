import { Product } from "@/lib/types/product";
import { api } from "../axios";

export const fetchProducts = async (
  page: number,
  search?: string
): Promise<Product[]> => {
  const pageSize = 10;
  const skip = (page - 1) * 10;
  const filter = search ? `$filter=contains(Name,'${search}')` : "";
  const res = await api.get(
    `/Products?$top=${pageSize}&$skip=${skip}&${filter}`
  );
  return res.data.value ?? [];
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const res = await api.get(
    `/Products?$filter=Id eq ${id}&$expand=Category,Brand`
  );
  return res.data.value;
};

export const patchProduct = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  const res = await api.patch(`/Products(${id})`, payload);
  return res.data;
};
export const postProduct = async (
  payload: Partial<Product>
): Promise<Product> => {
  const res = await api.post(`/Products`, payload);
  return res.data.value;
};
