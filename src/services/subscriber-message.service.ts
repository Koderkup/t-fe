import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { Message } from "@/shared/types/message.interface";

export const SubscriberMessageService = {
  async getAllMessages({ shopId }: { shopId: string }) {
    return instance<Message[]>({
      url: `${UrlConfig.SUBSCRIBERS_MESSAGES}?shopId=${shopId}`,
      method: HttpMethod.GET,
    });
  },

  async getMessageById(id: string) {
    return instance<Message>({
      url: `${UrlConfig.SUBSCRIBERS_MESSAGES}/${id}`,
      method: HttpMethod.GET,
    });
  },

  async createMessage(
    data: FormData | Omit<Message, "id" | "status" | "createdAt">
  ) {
    return instance({
      url: UrlConfig.SUBSCRIBERS_MESSAGES,
      method: HttpMethod.POST,
      data,
    });
  },

  async updateMessage({
    id,
    data,
  }: {
    id: string;
    data: FormData | Partial<Message>;
  }) {
    return instance<Message>({
      url: `${UrlConfig.SUBSCRIBERS_MESSAGES}/${id}`,
      method: HttpMethod.PATCH,
      data,
    });
  },

  async sendMessage(id: string) {
    return instance({
      url: `${UrlConfig.SUBSCRIBERS_MESSAGES}/${id}`,
      method: HttpMethod.PUT,
    });
  },
};
