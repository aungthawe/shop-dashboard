import { Product } from "./product";

export interface OrderItem {
  Id: number;
  OrderId: number;
  ProductId: number;
  Product: Product;
  Quantity: number;
  // optional: product?: Product
}
