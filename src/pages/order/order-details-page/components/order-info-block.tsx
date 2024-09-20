import { FC } from "react";
import { useTranslation } from "react-i18next";
import OrderDetailsRow from "./order-details-row";
import { formatDate } from "@/utils/date-fns";
import { OrderStatus, Typography } from "@/components";

interface OrderInfoBlockProps {
  orderDate: Date;
  customerName: string;
  customerNumber: string;
  address?: string | undefined;
  payment?: string;
  status: string;
}

const OrderInfoBlock: FC<OrderInfoBlockProps> = ({
  orderDate,
  payment,
  customerName,
  customerNumber,
  address,
  status,
}) => {
  const { t } = useTranslation("orders-pages");

  return (
    <div className="mt-4 flex flex-col gap-y-2">
      <OrderDetailsRow
        label={t("order-details-page.info-list.order-date")}
        value={formatDate(orderDate, "dd.MM.yyyy")}
      />
      <OrderDetailsRow
        label={t("order-details-page.info-list.customer-name")}
        value={customerName}
      />
      <OrderDetailsRow
        label={t("order-details-page.info-list.customer-number")}
        value={customerNumber}
      />
      <OrderDetailsRow
        label={t("order-details-page.info-list.delivery-address")}
        value={address}
      />
      <OrderDetailsRow
        label={t("order-details-page.info-list.payment")}
        value={payment}
      />
      <div className="flex items-center gap-1">
        <Typography
          variant="body-base"
          className="font-medium"
          color="black_70"
        >
          {t("order-details-page.info-list.status")}
        </Typography>
        <OrderStatus status={status} />
      </div>
    </div>
  );
};

export default OrderInfoBlock;
