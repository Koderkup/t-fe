import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PromoService } from "@/services/promo.service.ts";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { useMainStore } from "@/store/main-store";

export const usePromoBlockAPI = (id?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeShopId, setActiveMedia] = useMainStore(state => [
    state.activeShopId,
    state.setActiveMedia,
  ]);

  const promoBlocks = useQuery({
    queryKey: ["all promo blocks", "promo-blocks", activeShopId],
    queryFn: () => PromoService.getAllPromos(activeShopId || ""),
    select: ({ data }) => data || [],
    staleTime: 5 * 60 * 1000,
  });

  const promoBlockById = useQuery({
    queryKey: ["all promo blocks", "promo block by id", id],
    queryFn: () => PromoService.getPromoBlockById(id || ""),
    select: ({ data }) => data,
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

  const createPromoBlock = useMutation({
    mutationFn: PromoService.createPromoBlock,
    mutationKey: ["create promo block"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["all promo blocks", "promo-blocks"],
      });
      setActiveMedia(null);
      navigate(RoutesPaths.PROMO_BLOCK);
    },
  });

  const updatePromoBlock = useMutation({
    mutationFn: PromoService.updatePromoBlock,
    mutationKey: ["update promo block"],
    onSuccess: async () => {
      setActiveMedia(null);
      await queryClient.invalidateQueries({ queryKey: ["all promo blocks"] });
    },
  });

  const deletePromoBlock = useMutation({
    mutationFn: PromoService.deletePromoBlock,
    mutationKey: ["delete ad block"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["all promo blocks", "promo-blocks", activeShopId],
      });
      setActiveMedia(null);
      navigate(RoutesPaths.PROMO_BLOCK);
    },
  });

  return {
    promoBlocks,
    promoBlockById,
    createPromoBlock,
    updatePromoBlock,
    deletePromoBlock,
  };
};
