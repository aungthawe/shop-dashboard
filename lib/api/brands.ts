import { api } from "../axios";
import { Brand } from "../types/brand";

export const fetchBrands = async (): Promise<Brand[]> => {
  const res = await api.get(`/Brands`);
  return res.data.value as Brand[];
};
export const postBrand = async (payload: Partial<Brand>): Promise<Brand> => {
  const res = await api.post(`/Brands`, payload);
  return res.data.value;
};
