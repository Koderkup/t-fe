import { FC } from "react";
import { OrderStatus, Typography } from "@/components";
import { formatDate } from "@/utils/date-fns";

interface OrderInformationProps {
  createdAt: Date;
  orderNumber: number;
  orderStatus: string;
}

const OrderInformation: FC<OrderInformationProps> = ({
  createdAt,
  orderNumber,
  orderStatus,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body-sm" className="font-medium !text-[#747677]">
        {formatDate(createdAt, "dd.MM.yyyy")}
      </Typography>
      <div className="flex items-center justify-between">
        <Typography variant="body-md" className="font-normal" color="black_100">
          #{orderNumber}
        </Typography>
        <OrderStatus status={orderStatus} />
      </div>
    </div>
  );
};

export default OrderInformation;
