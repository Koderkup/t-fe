import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { PromoCode } from "@/shared/types/promo-code.interface.ts";

export const PromoCodeService = {
  async getPromoCodes(id: string) {
    return instance<PromoCode[]>({
      url: `${UrlConfig.PROMO_CODES}?shopId=${id}`,
      method: HttpMethod.GET,
    });
  },

  async getPromoCodeById(id: string) {
    return instance<PromoCode>({
      url: `${UrlConfig.PROMO_CODES}/${id}`,
      method: HttpMethod.GET,
    });
  },

  async createPromoCode(data: Omit<PromoCode, "id">) {
    return instance({
      url: UrlConfig.PROMO_CODES,
      method: HttpMethod.POST,
      data,
    });
  },

  async deletePromoCode(id: string | number) {
    return instance({
      url: `${UrlConfig.PROMO_CODES}/${id}`,
      method: HttpMethod.DELETE,
    });
  },

  updatePromoCode(data: Partial<PromoCode>) {
    return instance<PromoCode>({
      url: `${UrlConfig.PROMO_CODES}/${data.id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },
};
