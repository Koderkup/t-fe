import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { ShopFields } from "@/shared/types/shop.interface";

export const ShopService = {
  async getShopById(id: string | number) {
    return instance<ShopFields>({
      url: `${UrlConfig.SHOPS}/${id}`,
      method: HttpMethod.GET,
    });
  },

  async updateShop({
    id,
    data,
  }: {
    id: string;
    data: FormData | Partial<ShopFields>;
  }) {
    return instance({
      url: `${UrlConfig.SHOPS}/${id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async getAllShops(userId: string) {
    return instance<Array<ShopFields>>({
      url: `${UrlConfig.SHOPS}?userId=${userId}`,
      method: HttpMethod.GET,
    });
  },
};
