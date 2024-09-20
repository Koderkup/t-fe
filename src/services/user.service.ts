import { instance } from "@/api/api.interceptor.ts";
import { UrlConfig } from "@/services/url.config.ts";
import { HttpMethod } from "@/api/methods.ts";
import { CreateUserDTO, User } from "@/shared/types/user.interface.ts";

export const UserService = {
  async getUserByTelegramId(telegramId: string | number) {
    return instance<User>({
      url: `${UrlConfig.USERS}/by-telegramId/${telegramId}`,
      method: HttpMethod.GET,
    });
  },

  async createUser(user: CreateUserDTO) {
    return instance<User>({
      url: UrlConfig.USERS,
      method: HttpMethod.POST,
      data: user,
    });
  },

  async updateUser(user: Partial<CreateUserDTO>) {
    return instance<User>({
      url: `${UrlConfig.USERS}/${user.telegramId}`,
      method: HttpMethod.PATCH,
      data: user,
    });
  },
};
