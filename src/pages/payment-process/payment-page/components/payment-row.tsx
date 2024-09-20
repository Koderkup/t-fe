import { FC } from "react";
import { Typography } from "@/components";

interface PaymentRowProps {
  featureTitle: string;
  featureText: string;
  price: number;
}

const PaymentRow: FC<PaymentRowProps> = ({
  featureTitle,
  featureText,
  price,
}) => {
  return (
    <div className="border-b border-solid border-[#efeff0] py-1 pb-[6px]">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-[2px]">
          <Typography
            variant="body-sm"
            color="black_60"
            className="font-medium"
          >
            {featureTitle}
          </Typography>
          <Typography
            variant="body-xl"
            color="main_black"
            className="font-normal tracking-[-0.04em]"
          >
            {featureText}
          </Typography>
        </div>
        <div>
          <Typography
            variant="body-xl"
            color="main_black"
            className="font-medium tracking-[-0.06em]"
            tag="h3"
          >
            ${price}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PaymentRow;
