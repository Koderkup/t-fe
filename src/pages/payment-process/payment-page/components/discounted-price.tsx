import { FC } from "react";
import { Typography } from "@/components";

interface DiscountedPriceProps {
  originalPrice: string;
  discountedPrice?: string;
}

const DiscountedPrice: FC<DiscountedPriceProps> = ({
  originalPrice,
  discountedPrice,
}) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <Typography
        variant="body-md"
        color="black_80"
        className="text-end font-normal line-through"
      >
        ${originalPrice}
      </Typography>
      <Typography variant="heading-lg" color="black_100">
        ${discountedPrice}
      </Typography>
    </div>
  );
};

export default DiscountedPrice;
