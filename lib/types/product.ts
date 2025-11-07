import { Brand } from "./brand";
import { Category } from "./category";
import { OrderItem } from "./orderItem";

export interface Product {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  Stock: number;
  CategoryId: number;
  Category?: Category | null;
  BrandId: number;
  Brand?: Brand | null;
  OrderItems: OrderItem[];
}
