import { instance } from "@/api/api.interceptor.ts";
import { Category } from "@/shared/types/category.interface.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { CreateCategoryDto } from "@/services/types.ts";

export const CategoryService = {
  async getAllCategories(id: string) {
    return instance<Category[]>({
      url: `${UrlConfig.CATEGORIES}?shopId=${id}`,
      method: HttpMethod.GET,
    });
  },

  async getCategoryById(id: string) {
    return instance<Category>({
      url: `${UrlConfig.CATEGORIES}/${id}`,
      method: HttpMethod.GET,
    });
  },

  async createCategory(data: CreateCategoryDto) {
    return instance({
      url: UrlConfig.CATEGORIES,
      method: HttpMethod.POST,
      data,
    });
  },

  async deleteCategory(id: string | number) {
    return instance({
      url: `${UrlConfig.CATEGORIES}/${id}`,
      method: HttpMethod.DELETE,
    });
  },
};
