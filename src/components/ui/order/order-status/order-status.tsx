import { FC, useMemo } from "react";
import { Typography } from "@/components";
import { STATUS_VARIANTS } from "./data";

interface OrderStatusProps {
  status: string;
}

const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const statusInfo = useMemo(() => {
    const statusVariant = STATUS_VARIANTS.find(
      variant => variant.text === status
    );
    if (statusVariant) {
      const Icon = statusVariant.icon;
      return {
        icon: <Icon />,
        text: statusVariant.text,
      };
    }
    return null;
  }, [status]);

  return (
    <div className="flex h-[26px] items-center gap-1 rounded-[13px] bg-main_black px-2 py-1">
      <span className="status-icon">{statusInfo?.icon}</span>
      <Typography variant="body-sm" className="font-normal !text-[#f9f9f9]">
        {statusInfo?.text}
      </Typography>
    </div>
  );
};

export default OrderStatus;
