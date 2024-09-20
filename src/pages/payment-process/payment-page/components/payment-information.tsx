import { FC, useMemo, useState } from "react";
import ListButton from "public/icons/list-button.svg";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";
import { useShopStore } from "@/store/shop-store";
import PaymentRow from "./payment-row";
import TotalPrice from "./total-price";
import PaymentTitle from "./payment-title";
import { cn } from "@/utils/twMerge";

const PaymentInformation: FC = () => {
  const { t } = useTranslation("payment-page");
  const [shopStepTwoFieldsData] = useShopStore(state => [
    state.shopStepTwoFieldsData,
  ]);
  const { visualDesignFeature, features } = shopStepTwoFieldsData;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const allFeatures = useMemo(
    () => (visualDesignFeature ? [visualDesignFeature, ...features] : features),
    [features, visualDesignFeature]
  );

  return (
    <div className="relative z-[10] flex flex-col gap-y-4">
      <PaymentTitle text="How would you like /to pay?" />
      <div
        className={cn(
          "flex flex-col gap-2 overflow-hidden",
          menuOpen ? "menu-open" : "menu-close"
        )}
      >
        <div className="flex items-center justify-between py-[9px]">
          <Typography
            variant="body-base"
            color="black_60"
            className="font-normal tracking-[0.01em]"
          >
            {t("all-items")}
          </Typography>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            type="button"
            className={cn(
              "outline-none transition-all duration-300",
              menuOpen ? "rotate-360" : "rotate-180"
            )}
          >
            <ListButton />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {allFeatures.map(feature => (
            <PaymentRow
              key={feature.featureId}
              featureText={feature.featureText}
              featureTitle={feature.featureTitle}
              price={feature.featurePrice}
            />
          ))}
        </div>
      </div>
      <TotalPrice />
    </div>
  );
};

export default PaymentInformation;
