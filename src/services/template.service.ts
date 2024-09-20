import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { Template } from "@/shared/types/templates.interface";

export const TemplateService = {
  async getTemplates() {
    return instance<Template[]>({
      url: UrlConfig.TEMPLATES,
      method: HttpMethod.GET,
    });
  },
};
