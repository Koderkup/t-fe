import { FC } from "react";
import { Product } from "@/shared/types/product.interface.ts";
import { Typography } from "@/components";

type Props = Product & {
  onCLick?: () => void;
};

const ProductCard: FC<Props> = ({ mediasUrl, name, prices, onCLick }) => {
  const bgImg = mediasUrl?.length
    ? mediasUrl[0]
    : import.meta.env.VITE_CLOTHES_NO_IMAGE;
  const { price, currency } =
    typeof prices === "string" ? JSON.parse(prices)[0] : prices[0];

  return (
    <div
      className="flex w-full cursor-pointer flex-col gap-0.5 justify-self-center overflow-hidden"
      role="presentation"
      onClick={onCLick}
    >
      <img
        className="h-[192px] w-full rounded-[20px] object-cover object-top"
        src={bgImg}
        alt={name}
      />

      <div className="flex flex-col">
        <Typography variant="body-xl" color="black_100" className="font-medium">
          {name}
        </Typography>

        <Typography variant="body-base" color="black_100">
          {price}
          <span className="ml-1">{currency}</span>
        </Typography>
      </div>
    </div>
  );
};

export default ProductCard;
