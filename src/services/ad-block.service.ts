import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { AdBlock } from "@/shared/types/ad-block.interface.ts";

export const AdBlockService = {
  async getAllAdBlocks(id: string) {
    return instance<AdBlock[]>({
      url: `${UrlConfig.AD_BLOCKS}?shopId=${id}`,
      method: HttpMethod.GET,
    });
  },

  async getAdBlockById(id: string | number) {
    return instance<AdBlock>({
      url: `${UrlConfig.AD_BLOCKS}/${id}`,
      method: HttpMethod.GET,
    });
  },

  async createAdBlock(data: FormData) {
    return instance<AdBlock>({
      url: UrlConfig.AD_BLOCKS,
      method: HttpMethod.POST,
      data,
    });
  },

  async updateAdBlock({
    id,
    data,
  }: {
    id: string;
    data: FormData | Partial<AdBlock>;
  }) {
    return instance<AdBlock>({
      url: `${UrlConfig.AD_BLOCKS}/${id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async uploadAdBlockImage({ id, data }: { id: string; data: FormData }) {
    return instance({
      url: `${UrlConfig.AD_BLOCKS}/${id}/uploadImage`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async deleteAdBlock(id: string | number) {
    return instance({
      url: `${UrlConfig.AD_BLOCKS}/${id}`,
      method: HttpMethod.DELETE,
    });
  },
};
