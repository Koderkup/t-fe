import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AppConfigurationService } from "@/services/app-configuration.service.ts";
import { useMainStore } from "@/store/main-store";

export const useAppConfigurationAPI = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);

  const appConfiguration = useQuery({
    queryKey: ["app configuration", activeShopId],
    queryFn: () =>
      AppConfigurationService.getAppConfiguration(activeShopId || ""),
    staleTime: 5 * 60 * 1000,
    select: ({ data }) => data,
    enabled: !!activeShopId,
  });

  const updateAppConfiguration = useMutation({
    mutationFn: AppConfigurationService.updateAppConfiguration,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["app configuration", activeShopId],
      });
      navigate(-1);
    },
  });

  return {
    updateAppConfiguration,
    appConfiguration,
  };
};
