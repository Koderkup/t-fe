import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user.service.ts";

export const useUserAPI = (telegramId?: string | number) => {
  const queryClient = useQueryClient();

  const getUserByTelegramId = useQuery({
    queryKey: ["user by telegram id", telegramId],
    queryFn: () => UserService.getUserByTelegramId(telegramId || ""),
    select: ({ data }) => data,
    staleTime: 5 * 60 * 1000,
    enabled: !!telegramId,
    retry: false,
  });

  const createUser = useMutation({
    mutationKey: ["create user"],
    mutationFn: UserService.createUser,
    onSuccess: async ({ data }) => {
      if (data.id) {
        await queryClient.invalidateQueries({
          queryKey: ["user by telegram id", data.telegramId],
        });
      }
    },
  });

  const updateUser = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: async ({ data }) => {
      if (data.id) {
        await queryClient.invalidateQueries({
          queryKey: ["user by telegram id", data.telegramId],
        });
      }
    },
  });

  return {
    getUserByTelegramId,
    createUser,
    updateUser,
  };
};
