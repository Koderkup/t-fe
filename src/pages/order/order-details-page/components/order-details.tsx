import { FC } from "react";
import { useTranslation } from "react-i18next";
import { OrderItemCard, Typography } from "@/components";
import OrderDetailedTotal from "./order-details-total";
import { OrderItem } from "@/shared/types/order.interface";
import { ProductPrices } from "@/shared/types/product.interface";
import ChangeStatusButton from "./change-status-button";
import OrderInfoBlock from "./order-info-block";

interface OrderDetailsProps {
  orderNumber: number;
  orderDate: Date;
  address?: string | undefined;
  payment?: string;
  status: string;
  items: Array<OrderItem>;
  totalPrice: Array<ProductPrices>;
  discountAmount: number;
  deliveryPrice: number;
}

const OrderDetails: FC<OrderDetailsProps> = ({
  orderNumber,
  orderDate,
  address,
  payment,
  totalPrice,
  status,
  items,
  discountAmount,
  deliveryPrice,
}) => {
  const { t } = useTranslation("orders-pages");

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="pt-2.5">
        <Typography
          tag="h1"
          variant="heading-lg"
          color="black_100"
          className="tracking-[-0.02em]"
        >
          {t("order-details-page.title", { orderNumber })}
        </Typography>
        <OrderInfoBlock
          orderDate={orderDate}
          customerName="Anna Nowak"
          customerNumber="+48 55 333 22 11"
          status={status}
          address={address}
          payment={payment}
        />
        <div className="mt-4 flex flex-col gap-y-2 pb-3 pt-2">
          {items.map(item => (
            <OrderItemCard
              key={item.productItemId}
              quantity={item.quantity}
              productItem={item.productItem}
            />
          ))}
        </div>
        <OrderDetailedTotal
          subTotal={totalPrice[0].price}
          currency={totalPrice[0].currency}
          deliveryPrice={deliveryPrice}
          discountAmount={discountAmount}
        />
      </div>
      <ChangeStatusButton />
    </div>
  );
};

export default OrderDetails;
