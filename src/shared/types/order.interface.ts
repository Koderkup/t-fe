import { ProductPrices } from "./product.interface";

export type OrderItem = {
  productItemId: string;
  quantity: number;
  productItem: {
    name: string;
    prices: Array<ProductPrices>;
    mediaUrls: Array<string>;
  };
  prices: Array<ProductPrices>;
};

export type Order = {
  id: string;
  customerId: string;
  address: string;
  payment: string;
  deliveryPrice: number;
  discountAmount: number;
  email: string;
  customer: {
    id: string;
    telegramID: string;
    orders: [null];
  };
  items: OrderItem[];
  totalPrice: Array<ProductPrices>;
  orderNumber: number;
  status: string;
  createdAt: Date;
};

export enum OrderStatuses {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Paid = "Paid",
}
