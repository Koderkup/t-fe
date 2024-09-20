import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { RoutesPaths } from "@/routes/paths.config";
import { useShopStore } from "@/store/shop-store";
import { FirstCreationStepService } from "@/services/first-creation-step.service";
import { AppCfg, IShop } from "@/shared/types/creation-steps.interface";
import usePreloadTranslation from "../usePreloadTranslation";

export const useFirstCreationStepAPI = () => {
  const { setShopId, setActiveStep } = useShopStore();
  const { preloadFn } = usePreloadTranslation();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const isThirdStepPage = pathname.includes("third-step");
  const isStripePage = pathname.includes("/stripe");

  const createAppCfg = useMutation({
    mutationFn: FirstCreationStepService.createAppCfg,
    mutationKey: ["create app cfg"],
  });

  const createFirstStep = useMutation({
    mutationFn: ({
      data,
    }: {
      configuration: AppCfg;
      data: FormData | Omit<IShop, "id" | "inDraft" | "configuration">;
    }) => FirstCreationStepService.createFirstStep(data),
    onSuccess: async ({ data }, { configuration }) => {
      await queryClient.invalidateQueries({
        queryKey: ["create first step"],
      });
      setActiveStep("second");
      preloadFn(
        "step-two-page",
        `${RoutesPaths.CREATE_APP}/${RoutesPaths.SECOND_STEP}`
      );
      createAppCfg.mutate({
        email: configuration.email,
        location: configuration.location,
        phoneNumber: configuration.phoneNumber,
        shopCurrencies: configuration.shopCurrencies,
        shopId: data.id,
        botToken: configuration.botToken,
      });
      setShopId(data.id);
    },
  });

  const updateShop = useMutation({
    mutationFn: ({
      shopId,
      data,
    }: {
      shopId: string;
      data: FormData | Partial<IShop>;
    }) => FirstCreationStepService.updateShop(shopId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["create first step"] });
      if (isThirdStepPage) {
        preloadFn(
          "payment-page",
          `${RoutesPaths.CREATE_APP}/${RoutesPaths.CREATION_PAYMENT}`
        );
      }

      if (isStripePage) {
        preloadFn(
          "payment-confirmation-page",
          `${RoutesPaths.CREATE_APP}/${RoutesPaths.PAYMENT_CONFIRAMTION}`
        );
      }
    },
  });

  return {
    createFirstStep,
    updateShop,
  };
};
