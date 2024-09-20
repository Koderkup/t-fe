import { FC } from "react";
import { useTranslation } from "react-i18next";
import PaymentMethodCard from "./payment-method-card";
import { Typography } from "@/components";
import { useShopStore } from "@/store/shop-store";
import { IFunctionality } from "@/shared/types/creation-steps.interface";

interface PaymentMethodListProps {
  data: Array<IFunctionality>;
}

const PaymentMethodList: FC<PaymentMethodListProps> = ({ data }) => {
  const { t } = useTranslation(["step-three-page", "translation"]);
  const [addFeature, shopStepTwoFieldsData, removeFeature] = useShopStore(
    state => [
      state.addFeature,
      state.shopStepTwoFieldsData,
      state.removeFeature,
    ]
  );

  return (
    <div className="flex flex-col gap-y-4 pb-[196px]">
      <Typography tag="h1" variant="heading-md" color="black_100">
        {t("payment-method-page.payment", { ns: "step-three-page" })}
      </Typography>
      <ul>
        {data.map(method => {
          const isFeatureActive = shopStepTwoFieldsData.features.some(
            el => el.featureTitle === `${method.name} method`
          );
          return (
            <PaymentMethodCard
              key={method.id}
              paymentName={method.name}
              price={+method.price.toFixed(2)}
              buttonText={
                isFeatureActive
                  ? t("dropdown-menu.menu-actions.remove-feature", {
                      ns: "translation",
                    })
                  : t("payment-method-page.add", { ns: "step-three-page" })
              }
              clickFn={() => {
                if (isFeatureActive) {
                  removeFeature(`${method.name} method`);
                } else {
                  addFeature({
                    featureId: method.id,
                    featureTitle: `${method.name} method`,
                    featureText: method.name,
                    featurePrice: +method.price.toFixed(2),
                  });
                }
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default PaymentMethodList;
