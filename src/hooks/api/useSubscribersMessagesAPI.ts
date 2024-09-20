import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SubscriberMessageService } from "@/services/subscriber-message.service";
import { RoutesPaths } from "@/routes/paths.config";
import { useMainStore } from "@/store/main-store";

export const useSubscribersMessagesAPI = (id?: string) => {
  const [toggleSuccesModal] = useMainStore(state => [state.toggleSuccesModal]);
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const sendMessage = useMutation({
    mutationFn: SubscriberMessageService.sendMessage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["messages", activeShopId],
      });
      toggleSuccesModal(true);
      navigate(RoutesPaths.NEWSLETTERS);
    },
  });

  const messages = useQuery({
    queryKey: ["messages", activeShopId],
    queryFn: () =>
      SubscriberMessageService.getAllMessages({
        shopId: activeShopId || "",
      }),
    select: ({ data }) => data,
    staleTime: 5 * 60 * 1000,
  });

  const message = useQuery({
    queryFn: () => SubscriberMessageService.getMessageById(id || ""),
    queryKey: ["messages", activeShopId, id],
    select: data => data.data,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const createMessage = useMutation({
    mutationFn: SubscriberMessageService.createMessage,
    onSuccess: async ({ data }) => {
      sendMessage.mutate(data.id);
    },
  });

  const createDraftMessage = useMutation({
    mutationFn: SubscriberMessageService.createMessage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["messages", activeShopId],
      });
      navigate(RoutesPaths.NEWSLETTERS);
    },
  });

  const updateMessage = useMutation({
    mutationFn: SubscriberMessageService.updateMessage,
    onSuccess: async ({ data }) => {
      sendMessage.mutate(data.id);
    },
  });

  const updateDraftMessage = useMutation({
    mutationFn: SubscriberMessageService.updateMessage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["messages", activeShopId],
      });
      navigate(RoutesPaths.NEWSLETTERS);
    },
  });

  return {
    messages,
    message,
    createMessage,
    updateMessage,
    createDraftMessage,
    updateDraftMessage,
    sendMessage,
  };
};
