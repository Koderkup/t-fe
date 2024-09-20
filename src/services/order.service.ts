import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { Order } from "@/shared/types/order.interface";

export const OrderService = {
  async getAllOrders(id: string) {
    return instance<Order[]>({
      url: `${UrlConfig.ORDERS}?shopId=${id}`,
      method: HttpMethod.GET,
    });
  },

  async getOrderById(id: string) {
    return instance<Order>({
      url: `${UrlConfig.ORDERS}/${id}`,
      method: HttpMethod.GET,
    });
  },

  async updateOrder(data: Partial<Order>) {
    return instance<Order[]>({
      url: `${UrlConfig.ORDERS}/${data.id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },
};
