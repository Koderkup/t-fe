import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { Product } from "@/shared/types/product.interface.ts";
import { CreateProductDto } from "./types";

export const ProductService = {
  async getAllProducts(id: string) {
    return instance<Product[]>({
      url: `${UrlConfig.PRODUCTS}?shopId=${id}`,
      method: HttpMethod.GET,
    });
  },

  async getProductById(id: string) {
    return instance<Product>({
      url: `${UrlConfig.PRODUCTS}/${id}`,
      method: HttpMethod.GET,
    });
  },

  async addProductToCategory(data: { categoryId: string; ids: Array<string> }) {
    return instance({
      url: `${UrlConfig.CATEGORIES}/${data.categoryId}/products`,
      method: HttpMethod.PATCH,
      data: {
        ids: data.ids,
      },
    });
  },

  async createProduct(data: FormData | CreateProductDto) {
    return instance({
      url: UrlConfig.PRODUCTS,
      method: HttpMethod.POST,
      data,
    });
  },

  async updateProduct({
    productId,
    data,
  }: {
    productId: string;
    data: FormData | Partial<CreateProductDto>;
  }) {
    return instance({
      url: `${UrlConfig.PRODUCTS}/${productId}`,
      method: HttpMethod.PATCH,
      data,
    });
  },
};
