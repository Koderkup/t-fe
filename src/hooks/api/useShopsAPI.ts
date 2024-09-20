import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShopService } from "@/services/shop.service";
import { ShopFields } from "@/shared/types/shop.interface";
import { useAppConfigurationAPI } from "./useAppConfigurationAPI";
import { useMainStore } from "@/store/main-store";
import { AppConfigurationUpdateDTO } from "@/shared/types/app-configuration.interface";

export const useShopsAPI = (id?: string, userId?: string) => {
  const queryClient = useQueryClient();
  const { updateAppConfiguration } = useAppConfigurationAPI();
  const [activeShopId, setActiveMedia] = useMainStore(state => [
    state.activeShopId,
    state.setActiveMedia,
  ]);

  const shop = useQuery({
    queryKey: ["shops", id],
    queryFn: () => ShopService.getShopById(id || ""),
    select: ({ data }) => data,
    enabled: !!id,
  });

  const shops = useQuery({
    queryKey: ["shops"],
    queryFn: () => ShopService.getAllShops(userId || ""),
    select: ({ data }) => data,
    enabled: !!userId,
  });

  const updateShop = useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      configuration: AppConfigurationUpdateDTO;
      data: FormData | Partial<ShopFields>;
    }) => ShopService.updateShop({ id: productId, data }),
    onSuccess: async ({ data }, { configuration }) => {
      if (configuration) {
        updateAppConfiguration.mutate({
          data: configuration,
          shopId: data.id,
        });
        setActiveMedia(null);
        await queryClient.invalidateQueries({
          queryKey: ["shops", activeShopId],
        });
      }
    },
  });

  return { shop, updateShop, shops };
};
