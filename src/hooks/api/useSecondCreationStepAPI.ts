import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RoutesPaths } from "@/routes/paths.config";
import { useFirstCreationStepAPI } from "./useFirstCreationStepAPI";
import { SecondCreationStepService } from "@/services/second-creation-step.service";
import { useShopStore } from "@/store/shop-store";
import { useMainStore } from "@/store/main-store";

export const useSecondCreationStepAPI = (id?: string) => {
  const { t } = useTranslation("translation");
  const { updateShop } = useFirstCreationStepAPI();
  const [shopId, addVisualDesignFeature, setActiveStep] = useShopStore(
    state => [state.shopId, state.addVisualDesignFeature, state.setActiveStep]
  );
  const [setStepTwoFormData] = useMainStore(state => [
    state.setStepTwoFormData,
  ]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const designs = useMutation({
    mutationFn: SecondCreationStepService.getAllDesigns,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["designs"],
      });
    },
  });

  const design = useQuery({
    queryKey: ["designs", id],
    queryFn: () => SecondCreationStepService.getDesignById(id || ""),
    select: ({ data }) => data,
    enabled: !!id,
  });

  const createDesign = useMutation({
    mutationFn: SecondCreationStepService.createDesign,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({
        queryKey: ["create design"],
      });

      if (data.id) {
        setActiveStep("third");
        const formData = new FormData();
        formData.append("designId", JSON.stringify(data.id));

        updateShop.mutate({
          shopId,
          data: formData,
        });
        addVisualDesignFeature({
          featureId: data.id,
          featurePrice: data.price,
          featureText: data.name,
          featureTitle: t("dropdown-menu.features.visual-design", {
            ns: "translation",
          }),
        });
        setStepTwoFormData({
          font: "",
          highlightColor: "",
          textSize: "",
          theme: "",
        });
      }
      navigate(`${RoutesPaths.CREATE_APP}/${RoutesPaths.SECOND_STEP}`);
    },
  });

  return {
    designs,
    design,
    createDesign,
  };
};
