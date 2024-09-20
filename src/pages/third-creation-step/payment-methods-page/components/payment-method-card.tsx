import { FC } from "react";
import { Typography } from "@/components";

interface PaymentMethodCardProps {
  buttonText: string;
  paymentName: string;
  price: number;
  clickFn: () => void;
}

const PaymentMethodCard: FC<PaymentMethodCardProps> = ({
  paymentName,
  price,
  clickFn,
  buttonText,
}) => {
  return (
    <li className="flex items-end justify-between border-b border-solid border-[#efeff0] py-3">
      <div className="flex flex-col">
        <Typography
          tag="h4"
          variant="body-base"
          className="font-normal !text-[#2d313f]"
        >
          {paymentName}
        </Typography>
        <Typography
          variant="body-xl"
          className="font-medium tracking-[-0.06em] !text-[#2d313f]"
        >
          ${price}
        </Typography>
      </div>
      <button
        onClick={clickFn}
        className="flex items-center rounded-[20px] bg-black_100 px-[21px] py-2"
      >
        <Typography variant="body-md" color="white" className="font-medium">
          {buttonText}
        </Typography>
      </button>
    </li>
  );
};

export default PaymentMethodCard;
