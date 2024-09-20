import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import {
  AppCfg,
  FirstCreationStep,
  IShop,
} from "@/shared/types/creation-steps.interface";

export const FirstCreationStepService = {
  async createFirstStep(data: FormData | Omit<FirstCreationStep, "id">) {
    return instance({
      url: UrlConfig.SHOPS,
      method: HttpMethod.POST,
      data,
    });
  },

  async createAppCfg(data: AppCfg) {
    return instance({
      url: UrlConfig.APP_CONFIGURATIONS,
      method: HttpMethod.POST,
      data,
    });
  },

  async updateShop(shopId: string, data: FormData | Partial<IShop>) {
    return instance({
      url: `${UrlConfig.SHOPS}/${shopId}`,
      method: HttpMethod.PATCH,
      data,
    });
  },
};
