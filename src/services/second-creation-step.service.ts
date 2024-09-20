import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { IDesign } from "@/shared/types/creation-steps.interface";

export const SecondCreationStepService = {
  async createDesign(data: Partial<IDesign>) {
    return instance({
      url: UrlConfig.DESIGNS,
      method: HttpMethod.POST,
      data,
    });
  },

  async getAllDesigns(data: {
    limit: number;
    searchString: string;
    tags: Array<string>;
  }) {
    return instance<IDesign[]>({
      url: `${UrlConfig.DESIGNS}/findAll`,
      method: HttpMethod.POST,
      data,
    });
  },

  async getDesignById(id: string) {
    return instance<IDesign>({
      url: `${UrlConfig.DESIGNS}/${id}`,
      method: HttpMethod.GET,
    });
  },
};
