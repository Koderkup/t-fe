import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import {
  AppConfiguration,
  AppConfigurationUpdateDTO,
} from "@/shared/types/app-configuration.interface.ts";

export const AppConfigurationService = {
  async getAppConfiguration(shopId: string) {
    return instance<AppConfiguration>({
      url: `${UrlConfig.APP_CONFIGURATIONS}?shopId=${shopId}`,
      method: HttpMethod.GET,
    });
  },

  async updateAppConfiguration({
    data,
    shopId,
  }: {
    data: FormData | AppConfigurationUpdateDTO;
    shopId: string;
  }) {
    return instance({
      url: `${UrlConfig.APP_CONFIGURATIONS}?shopId=${shopId}`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async updateAppConfigurationImg({
    data,
    shopId,
  }: {
    data: FormData;
    shopId: string;
  }) {
    return instance({
      url: `${UrlConfig.APP_CONFIGURATIONS}?shopId=${shopId}`,
      method: HttpMethod.PATCH,
      data,
    });
  },
};
