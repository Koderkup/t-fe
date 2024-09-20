import { FC } from "react";
import { useTranslation } from "react-i18next";
import PriceDetails from "./price-detatils";

interface OrderDetailsTotalProps {
  subTotal: number;
  currency: string;
  discountAmount: number;
  deliveryPrice: number;
}

const OrderDetailsTotal: FC<OrderDetailsTotalProps> = ({
  subTotal,
  currency,
  discountAmount,
  deliveryPrice,
}) => {
  const { t } = useTranslation("orders-pages");

  return (
    <div className="flex flex-col gap-2 border-t border-[rgba(24,26,28,0.2)] pb-[6px] pt-4">
      <PriceDetails
        label={t("order-details-page.price-info.subtotal")}
        currency={currency}
        price={subTotal}
        isTotal={false}
      />
      <PriceDetails
        label={t("order-details-page.price-info.discount")}
        currency={currency}
        price={discountAmount}
        isTotal={false}
      />
      <PriceDetails
        label={t("order-details-page.price-info.delivery")}
        currency={currency}
        price={deliveryPrice}
        isTotal={false}
      />
      <PriceDetails
        label={t("total")}
        currency={currency}
        price={399.99}
        isTotal
      />
    </div>
  );
};

export default OrderDetailsTotal;
