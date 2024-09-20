import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useParams } from "react-router-dom";
import useHistoryBack from "@/hooks/useHistoryBack";
import { orders } from "../data";
import OrderDetails from "./components/order-details";
import { useOrdersAPI } from "@/hooks/api/useOrdersAPI";

const OrderDetailsPage: FC = () => {
  const params = useParams<{ orderId: string }>();
  const { order } = useOrdersAPI(params.orderId);
  const { goBack } = useHistoryBack();

  if (!order.data) return null;

  return (
    <div>
      <BackButton onClick={goBack} />
      <div className="px-4">
        <OrderDetails
          totalPrice={orders[0].totalPrice}
          orderNumber={order.data?.orderNumber}
          orderDate={order.data?.createdAt}
          address={order.data.address}
          payment={order.data.payment}
          status={order.data.status}
          items={order.data.items}
          discountAmount={order.data.discountAmount}
          deliveryPrice={order.data.deliveryPrice}
        />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
