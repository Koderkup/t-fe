import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";
import { useMainStore } from "@/store/main-store";
import { useShopStore } from "@/store/shop-store";
import { cn } from "@/utils/twMerge";
import DiscountedPrice from "./discounted-price";

const TotalPrice: FC = () => {
  const { t } = useTranslation("payment-page");
  const [paymentMethod] = useMainStore(state => [state.paymentMethod]);
  const [shopStepTwoFieldsData] = useShopStore(state => [
    state.shopStepTwoFieldsData,
  ]);

  const priceWithDiscount = useMemo(
    () =>
      paymentMethod === "ton"
        ? shopStepTwoFieldsData.totalPrice -
          (shopStepTwoFieldsData.totalPrice * 5) / 100
        : null,
    [shopStepTwoFieldsData.totalPrice, paymentMethod]
  );

  const formattedTotalPrice = shopStepTwoFieldsData.totalPrice.toFixed(2);
  const formattedDiscountedPrice = priceWithDiscount?.toFixed(2);

  return (
    <div
      className={cn("flex items-center justify-between", {
        "items-end": priceWithDiscount,
      })}
    >
      <div className="flex items-center gap-2">
        <Typography variant="body-xl" className="font-medium" color="black_100">
          {t("total")}
        </Typography>
        {priceWithDiscount ? (
          <div className="flex h-[22px] items-center rounded-[20px] border border-solid border-black_80 px-2">
            <Typography
              variant="body-sm"
              color="black_80"
              className="font-medium"
            >
              -5%
            </Typography>
          </div>
        ) : null}
      </div>
      <div>
        {priceWithDiscount ? (
          <DiscountedPrice
            originalPrice={formattedTotalPrice}
            discountedPrice={formattedDiscountedPrice}
          />
        ) : (
          <Typography variant="heading-lg" color="black_100">
            ${formattedTotalPrice}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default TotalPrice;
