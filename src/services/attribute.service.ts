import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { Color } from "@/shared/types/color.interface";
import { Size } from "@/shared/types/size.interface";
import { CreateColorDto, CreateSizeDto } from "./types";

export const AttributeService = {
  async updateColor(data: Partial<Color>) {
    return instance<Color>({
      url: `${UrlConfig.COLORS}/${data.id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async updateSize(data: Partial<Size>) {
    return instance<Size>({
      url: `${UrlConfig.SIZES}/${data.id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async createSize(data: CreateSizeDto) {
    return instance<Size>({
      url: UrlConfig.SIZES,
      method: HttpMethod.POST,
      data,
    });
  },

  async createColor(data: CreateColorDto) {
    return instance({
      url: UrlConfig.COLORS,
      method: HttpMethod.POST,
      data,
    });
  },

  async deleteColor(id: string) {
    return instance({
      url: `${UrlConfig.COLORS}/${id}`,
      method: HttpMethod.DELETE,
    });
  },

  async deleteSize(id: string) {
    return instance({
      url: `${UrlConfig.SIZES}/${id}`,
      method: HttpMethod.DELETE,
    });
  },
};
