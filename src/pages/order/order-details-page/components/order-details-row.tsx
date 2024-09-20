import { FC } from "react";
import { Typography } from "@/components";

interface OrderDetailsRowProps {
  label: string;
  value?: string;
}

const OrderDetailsRow: FC<OrderDetailsRowProps> = ({ label, value }) => {
  return (
    <Typography variant="body-base" className="font-medium" color="black_70">
      {label}
      <span className="pl-1 text-main_black">{value}</span>
    </Typography>
  );
};

export default OrderDetailsRow;
