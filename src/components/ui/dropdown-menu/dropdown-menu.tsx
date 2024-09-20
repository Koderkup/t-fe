import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Button from "../button/button";
import DropdownList from "./components/dropdown-list";
import { cn } from "@/utils/twMerge";
import { useShopStore } from "@/store/shop-store";
import { RoutesPaths } from "@/routes/paths.config";
import { useFirstCreationStepAPI } from "@/hooks/api/useFirstCreationStepAPI";
import usePreloadTranslation from "@/hooks/usePreloadTranslation";

interface DropdownMenuProps {
  type: "default" | "step-three";
}

const DropdownMenu: FC<DropdownMenuProps> = ({ type }) => {
  const { t } = useTranslation();
  const { preloadFn } = usePreloadTranslation();
  const { updateShop } = useFirstCreationStepAPI();
  const [shopStepTwoFieldsData, shopId, setActiveStep] = useShopStore(state => [
    state.shopStepTwoFieldsData,
    state.shopId,
    state.setActiveStep,
  ]);

  const { pathname } = useLocation();
  const isSecondStepPage = pathname.includes("second-step");

  const isButtonDisable = useMemo(
    () => isSecondStepPage && !shopStepTwoFieldsData.visualDesignFeature,
    [isSecondStepPage, shopStepTwoFieldsData.visualDesignFeature]
  );

  const functionalityIds = useMemo(
    () =>
      shopStepTwoFieldsData.features.map(el =>
        el.featureId ? +el.featureId : 1
      ) as Array<number>,
    [shopStepTwoFieldsData.features]
  );

  return (
    <div className="fixed bottom-0 left-[16px] right-[16px] z-[30] flex flex-col gap-1">
      <DropdownList />
      <div className={cn("py-2", type === "default" ? "bg-white" : "")}>
        <Button
          disabled={isButtonDisable}
          onClick={() => {
            if (isSecondStepPage) {
              preloadFn(
                "step-three-page",
                `${RoutesPaths.CREATE_APP}/${RoutesPaths.THIRD_STEP}`
              );
            } else {
              setActiveStep("payment");
              const formData = new FormData();
              formData.append(
                "functionalityIds",
                JSON.stringify(functionalityIds)
              );

              updateShop.mutate({
                shopId,
                data: formData,
              });
            }
          }}
          className="mb-4"
        >
          {t("action-sheet.actions.continue")}
        </Button>
      </div>
    </div>
  );
};

export default DropdownMenu;
