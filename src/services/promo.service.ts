import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { PromoBlock } from "@/shared/types/promo-block.interface.ts";

export const PromoService = {
  async getAllPromos(id: string) {
    return instance<PromoBlock[]>({
      url: `${UrlConfig.PROMOTIONAL_BLOCKS}?shopId=${id}`,
      method: HttpMethod.GET,
    });
  },

  async getPromoBlockById(id: string | number) {
    return instance<PromoBlock>({
      url: `${UrlConfig.PROMOTIONAL_BLOCKS}/${id}`,
      method: HttpMethod.GET,
    });
  },

  async createPromoBlock(data: FormData) {
    return instance({
      url: UrlConfig.PROMOTIONAL_BLOCKS,
      method: HttpMethod.POST,
      data,
    });
  },

  async setPromoImage({ id, data }: { id: string; data: FormData }) {
    return instance({
      url: `${UrlConfig.PROMOTIONAL_BLOCKS}/${id}/uploadFile`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async deletePromoBlock(id: string | number) {
    return instance({
      url: `${UrlConfig.PROMOTIONAL_BLOCKS}/${id}`,
      method: HttpMethod.DELETE,
    });
  },

  async updatePromoBlock({
    id,
    data,
  }: {
    data: FormData | Partial<PromoBlock>;
    id: string;
  }) {
    return instance({
      url: `${UrlConfig.PROMOTIONAL_BLOCKS}/${id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },
};
