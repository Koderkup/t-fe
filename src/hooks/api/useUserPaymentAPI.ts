import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPaymentService } from "@/services/user-payment.service";
import { useShopStore } from "@/store/shop-store";
import { useFirstCreationStepAPI } from "./useFirstCreationStepAPI";

export const useUserPaymentAPI = () => {
  const queryClient = useQueryClient();
  const { updateShop } = useFirstCreationStepAPI();
  const [clearFeatures, shopId, setActiveStep] = useShopStore(state => [
    state.clearFeatures,
    state.shopId,
    state.setActiveStep,
  ]);

  const createUserPayment = useMutation({
    mutationFn: UserPaymentService.createPayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user-payment"] });
      const activeShop = false;
      const formData = new FormData();
      formData.append("inDraft", JSON.stringify(activeShop));

      updateShop.mutate({
        shopId,
        data: formData,
      });
      setActiveStep(null);
      clearFeatures();
    },
  });

  return { createUserPayment };
};
