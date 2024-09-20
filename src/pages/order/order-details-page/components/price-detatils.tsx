import { FC } from "react";
import { cn } from "@/utils/twMerge";
import { Typography } from "@/components";

interface PriceDetailsProps {
  label: string;
  currency: string;
  price: number;
  isTotal: boolean;
}

const PriceDetails: FC<PriceDetailsProps> = ({
  price,
  currency,
  label,
  isTotal,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Typography
        variant="body-base"
        color={isTotal ? "black_100" : "black_70"}
        className={isTotal ? "font-semibold" : "font-normal"}
      >
        {label}
      </Typography>
      <Typography
        variant="body-base"
        color={isTotal ? "black_100" : "black_70"}
        className={cn(
          "tracking-[0.01em]",
          isTotal ? "font-semibold" : "font-normal"
        )}
      >
        {price} {currency}
      </Typography>
    </div>
  );
};

export default PriceDetails;
