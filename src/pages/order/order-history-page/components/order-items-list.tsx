import { FC } from "react";
import { OrderItem as OrderItemInterface } from "@/shared/types/order.interface";
import { OrderItemCard } from "@/components";

interface OrderItemsListProps {
  items: Array<OrderItemInterface>;
}

const OrderItemsList: FC<OrderItemsListProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map(item => (
        <OrderItemCard
          key={item.productItemId}
          quantity={item.quantity}
          productItem={item.productItem}
        />
      ))}
    </div>
  );
};

export default OrderItemsList;
