import { FC } from "react";
import Typography from "@/components/ui/typography/typography";

interface BannerCardProps {
  title: string;
  description: string;
  imgUrl: string;
}

const BannerCard: FC<BannerCardProps> = ({ title, description, imgUrl }) => {
  return (
    <div>
      <div className="flex h-[315px] items-center">
        <div className="h-fit w-full">
          <img
            src={imgUrl}
            alt={title}
            className="h-full w-full max-w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-[23px] flex flex-col gap-3 px-6">
        <Typography variant="heading-xl" tag="h1" color="black_100">
          {title}
        </Typography>
        <Typography
          variant="body-base"
          tag="p"
          color="black_100"
          className="font-normal"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default BannerCard;
