import { FC, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { cn } from "@/utils/twMerge";
import DropdownRow from "./dropdown-row";
import { useShopStore } from "@/store/shop-store";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const DropdownList: FC = () => {
  const { t } = useTranslation("translation");
  const [shopStepTwoFieldsData, removeFeature, removeDesignFeature] =
    useShopStore(state => [
      state.shopStepTwoFieldsData,
      state.removeFeature,
      state.removeDesignFeature,
    ]);
  const { visualDesignFeature, features } = shopStepTwoFieldsData;

  const [open, setOpen] = useState<boolean>(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useOnClickOutside(dropdownMenuRef, () => setOpen(false));

  const allFeatures = useMemo(
    () => (visualDesignFeature ? [visualDesignFeature, ...features] : features),
    [features, visualDesignFeature]
  );

  return (
    <div
      ref={dropdownMenuRef}
      className={cn(
        "max-h-[90px] w-full rounded-[20px] bg-white px-4 py-3 shadow-dropdown",
        {
          "dropdown-open overflow-y-auto": open,
          "dropdown-close overflow-hidden": !open,
        }
      )}
    >
      <DropdownRow
        price={+shopStepTwoFieldsData.totalPrice.toFixed(2)}
        type="heading-row"
        rowTitle={t("dropdown-menu.selected")}
        itemCount={allFeatures.length}
        open={open}
        clickFn={() => setOpen(prev => !prev)}
      />
      <div
        className={cn(
          "mt-[6px] flex flex-col gap-3",
          open ? "opacity-1" : "opacity-animation opacity-0"
        )}
      >
        {allFeatures.length ? (
          allFeatures.map((feature, idx) => {
            const isThirdStep = idx === 0 && pathname.includes("third-step");
            return (
              <DropdownRow
                key={feature.featureTitle}
                price={feature.featurePrice}
                type="default-row"
                rowTitle={feature.featureTitle}
                text={feature.featureText}
                clickFn={() => {
                  if (
                    feature.featureTitle ===
                    t("dropdown-menu.features.visual-design")
                  ) {
                    removeDesignFeature();
                  } else {
                    removeFeature(feature.featureTitle);
                  }
                }}
                disableRemoveButton={isThirdStep}
              />
            );
          })
        ) : (
          <div className="flex h-[200px] w-full items-center justify-center">
            placeholder
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownList;
