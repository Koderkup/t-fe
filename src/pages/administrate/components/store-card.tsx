import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@/components";
import { StoreCardProps } from "@/shared/types/types";

const StoreCard: FC<StoreCardProps> = ({ imgUrl, title, description, id }) => {
  return (
    <Link to={id} className="flex items-center gap-3">
      <div className="h-[77px] w-[77px] max-w-[77px] flex-[1_0_77px]">
        <Avatar type="preview" mediaUrl={imgUrl} />
      </div>
      <div className="flex flex-col gap-y-1">
        <Typography
          tag="h4"
          variant="body-xl"
          color="black_100"
          className="font-medium tracking-[-0.06em]"
        >
          {title}
        </Typography>
        <Typography
          tag="p"
          variant="body-md"
          color="black_70"
          className="font-normal"
        >
          {description}
        </Typography>
      </div>
    </Link>
  );
};

export default StoreCard;
