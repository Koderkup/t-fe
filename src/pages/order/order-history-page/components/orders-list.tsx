import { FC } from "react";
import { Link } from "react-router-dom";
import LinkArrowIcon from "public/icons/link-arrow.svg";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/twMerge";
import OrderItemsList from "./order-items-list";
import OrderInformation from "./order-information";
import { Order } from "@/shared/types/order.interface";
import { Typography } from "@/components";

interface OrdersListProps {
  orders: Array<Order>;
}

const OrdersList: FC<OrdersListProps> = ({ orders }) => {
  const { t } = useTranslation("orders-pages");

  return (
    <div className="hide-scrollbar mt-4 flex h-full flex-col gap-2 overflow-auto">
      {orders.map((order, idx) => {
        /*   const totalPrice = order.totalPrice[0]; */
        return (
          <div
            key={order.id}
            className={cn("flex flex-col gap-y-3 py-2", {
              "border-b border-[rgba(24,26,28,0.2)]": idx !== orders.length - 1,
            })}
          >
            <OrderInformation
              createdAt={order.createdAt}
              orderNumber={order.orderNumber}
              orderStatus={order.status}
            />
            <OrderItemsList items={order.items} />
            <div className="flex items-center justify-between">
              <Typography
                variant="body-base"
                className="font-medium"
                color="black_100"
              >
                {t("total")}
              </Typography>
              <Typography
                variant="body-base"
                className="font-medium"
                color="black_100"
              >
                1000 USD
              </Typography>
            </div>
            <div className="flex justify-center">
              <Link className="flex items-center" to={`${order.id}`}>
                <Typography
                  variant="body-md"
                  className="font-normal !text-[#747677]"
                >
                  {t("order-history-page.link-text")}
                </Typography>
                <LinkArrowIcon />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;
