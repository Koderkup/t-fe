import { FC } from "react";
import { Typography } from "@/components";

type Props = {
  title: string;
  description?: string;
};

const PageInfo: FC<Props> = ({ description, title }) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography variant="heading-md">{title}</Typography>

      {description && (
        <Typography variant="body-base" color="black_100">
          {description}
        </Typography>
      )}
    </div>
  );
};

export default PageInfo;
