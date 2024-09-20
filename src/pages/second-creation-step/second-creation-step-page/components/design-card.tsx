import { FC } from "react";
import { Typography } from "@/components";

interface DesignCardProps {
  imgUrl: string;
  title: string;
  price: number;
  tag: string;
}

const DesignCard: FC<DesignCardProps> = ({ imgUrl, title, price, tag }) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <div className="relative h-[192px] w-full rounded-[20px]">
        <img
          src={imgUrl}
          alt={title}
          className="h-full w-full max-w-full rounded-[20px] object-cover"
        />
        <div className="bg-[rgba(0, 0, 0.6)] absolute bottom-[16px] right-[15.5px] flex h-[22px] w-fit items-center rounded-[20px] border-[1px] border-solid border-white px-2 backdrop-blur-sm">
          <Typography
            variant="body-sm"
            tag="span"
            className="font-normal"
            color="white"
          >
            {tag}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col">
        <Typography variant="body-xl" className="font-medium" color="black_100">
          {title}
        </Typography>
        <Typography
          variant="body-base"
          className="font-normal"
          color="black_100"
        >
          ${price}
        </Typography>
      </div>
    </div>
  );
};

export default DesignCard;
