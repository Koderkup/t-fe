import { useTranslation } from "react-i18next";
import { FC } from "react";
import Typography from "@/components/ui/typography/typography";
import { cn } from "@/utils/twMerge";
import { OrderStatus } from "@/shared/types/types";
import { StatusKeys } from "@/@types/i18next";

interface OrderStatusCardProps {
  onStatusChange: (statusName: string) => void;
  name: OrderStatus;
  icon: string;
  idx: number;
  lastStatusIdx: number;
  previousElement: boolean;
  orderStatus: string;
}

const OrderStatusCard: FC<OrderStatusCardProps> = ({
  name,
  onStatusChange,
  icon,
  previousElement,
  lastStatusIdx,
  idx,
  orderStatus,
}) => {
  const { t } = useTranslation("orders-pages");
  const StatusIcon = icon;

  return (
    <li>
      <button
        onClick={() => onStatusChange(name)}
        className={cn(
          "flex w-full items-center gap-4 border-solid border-black_10 px-6 py-4",
          idx === lastStatusIdx ? "border-b-none" : "border-b",
          name === orderStatus ? "rounded-lg bg-black_10" : "bg-white",
          previousElement ? "border-[rgba(0,0,0,0)]" : null
        )}
      >
        <span className="status-icon-modal">
          <StatusIcon />
        </span>
        <Typography
          variant="body-base"
          className="font-normal capitalize tracking-[0.01em]"
          color="black_100"
        >
          {t(`status-variants.${name.toLowerCase() as StatusKeys}`)}
        </Typography>
      </button>
    </li>
  );
};

export default OrderStatusCard;
