import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PromoCodeService } from "@/services/promo-code.service.ts";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { useMainStore } from "@/store/main-store";

export const usePromoCodesAPI = (id?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);

  const promoCodes = useQuery({
    queryFn: () => PromoCodeService.getPromoCodes(activeShopId || ""),
    queryKey: ["all promo codes", "promoCodes", activeShopId],
    select: data => data.data,
    staleTime: 5 * 60 * 1000,
  });

  const promoCodeById = useQuery({
    queryFn: () => PromoCodeService.getPromoCodeById(id || ""),
    queryKey: ["all promo codes", "promo code", id],
    select: data => data.data,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const createPromoCode = useMutation({
    mutationFn: PromoCodeService.createPromoCode,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["all promo codes", "promoCodes", activeShopId],
      });
      navigate(RoutesPaths.PROMO_CODES);
    },
  });

  const updatePromoCode = useMutation({
    mutationFn: PromoCodeService.updatePromoCode,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["all promo codes", "promoCodes", activeShopId],
      });
      navigate(RoutesPaths.PROMO_CODES);
    },
  });

  const deletePromoCode = useMutation({
    mutationFn: PromoCodeService.deletePromoCode,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["all promo codes", "promoCodes", activeShopId],
      });
      navigate(RoutesPaths.PROMO_CODES);
    },
  });

  return {
    promoCodes,
    createPromoCode,
    updatePromoCode,
    deletePromoCode,
    promoCodeById,
  };
};
