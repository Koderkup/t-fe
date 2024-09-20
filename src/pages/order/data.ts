import testImg from "public/images/order-test.webp";
import { Order } from "@/shared/types/order.interface";

export const orders: Order[] = [
  {
    id: "order1",
    customerId: "customer1",
    address: "123 Main St, City, Country",
    payment: "Credit Card",
    deliveryPrice: 10.0,
    discountAmount: 5.0,
    email: "customer1@example.com",
    customer: {
      id: "customer1",
      telegramID: "telegram_customer1",
      orders: [null],
    },
    items: [
      {
        productItemId: "product1",
        quantity: 2,
        productItem: {
          name: "Product 1",
          prices: [{ currency: "USD", price: 20.0 }],
          mediaUrls: [testImg],
        },
        prices: [{ currency: "USD", price: 20.0 }],
      },
      {
        productItemId: "product2",
        quantity: 1,
        productItem: {
          name: "Product 2",
          prices: [{ currency: "USD", price: 15.0 }],
          mediaUrls: [testImg],
        },
        prices: [{ currency: "USD", price: 15.0 }],
      },
    ],
    totalPrice: [{ currency: "USD", price: 55.0 }],
    orderNumber: 1,
    status: "Shipped",
    createdAt: new Date("2023-07-25T12:00:00Z"),
  },
  {
    id: "order2",
    customerId: "customer2",
    address: "456 Another St, City, Country",
    payment: "PayPal",
    deliveryPrice: 8.0,
    discountAmount: 0.0,
    email: "customer2@example.com",
    customer: {
      id: "customer2",
      telegramID: "telegram_customer2",
      orders: [null],
    },
    items: [
      {
        productItemId: "product3",
        quantity: 1,
        productItem: {
          name: "Product 3",
          prices: [{ currency: "USD", price: 30.0 }],
          mediaUrls: [testImg],
        },
        prices: [{ currency: "USD", price: 30.0 }],
      },
    ],
    totalPrice: [{ currency: "USD", price: 38.0 }],
    orderNumber: 2,
    status: "Pending",
    createdAt: new Date("2023-07-26T15:30:00Z"),
  },
  {
    id: "order3",
    customerId: "customer3",
    address: "789 Different St, City, Country",
    payment: "Bank Transfer",
    deliveryPrice: 12.0,
    discountAmount: 2.0,
    email: "customer3@example.com",
    customer: {
      id: "customer3",
      telegramID: "telegram_customer3",
      orders: [null],
    },
    items: [
      {
        productItemId: "product4",
        quantity: 3,
        productItem: {
          name: "Product 4",
          prices: [{ currency: "USD", price: 25.0 }],
          mediaUrls: [testImg],
        },
        prices: [{ currency: "USD", price: 25.0 }],
      },
      {
        productItemId: "product5",
        quantity: 2,
        productItem: {
          name: "Product 5",
          prices: [{ currency: "USD", price: 10.0 }],
          mediaUrls: [testImg],
        },
        prices: [{ currency: "USD", price: 10.0 }],
      },
    ],
    totalPrice: [{ currency: "USD", price: 109.0 }],
    orderNumber: 3,
    status: "Pending",
    createdAt: new Date("2023-07-27T09:45:00Z"),
  },
];
