import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { CreateUserPaymentDto } from "@/services/types.ts";

export const UserPaymentService = {
  async createPayment(data: CreateUserPaymentDto) {
    return instance({
      url: UrlConfig.USER_PAYMENTS,
      method: HttpMethod.POST,
      data,
    });
  },
};
