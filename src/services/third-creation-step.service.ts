import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { IFunctionality } from "@/shared/types/creation-steps.interface";

export const ThirdCreationStepService = {
  async getAllFunctionalities() {
    return instance<IFunctionality[]>({
      url: `${UrlConfig.FUNCTIONALITIES}/findAll`,
      method: HttpMethod.POST,
    });
  },

  async getFunctionalitieById(id: string) {
    return instance<IFunctionality>({
      url: `${UrlConfig.FUNCTIONALITIES}/${id}`,
      method: HttpMethod.GET,
    });
  },
};
