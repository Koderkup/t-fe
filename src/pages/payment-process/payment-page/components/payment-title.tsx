import { FC } from "react";
import { Typography } from "@/components";

interface PaymentTitleProps {
  text: string;
}

const PaymentTitle: FC<PaymentTitleProps> = ({ text }) => {
  const textArray = text.split("/");

  return (
    <div className="w-full pt-6">
      <Typography variant="heading-xl" color="black_60">
        {textArray[0]} <span className="text-main_black">{textArray[1]}</span>
      </Typography>
    </div>
  );
};

export default PaymentTitle;
