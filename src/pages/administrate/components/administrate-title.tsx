import { FC } from "react";
import { Typography } from "@/components";

interface AdministrateTitleProps {
  title: string;
  descriptionFirst: string;
  descriptionSecond: string;
}

const AdministrateTitle: FC<AdministrateTitleProps> = ({
  title,
  descriptionFirst,
  descriptionSecond,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography
        variant="heading-md"
        tag="h1"
        color="black_100"
        className="tracking-[-0.04em]"
      >
        {title}
      </Typography>
      <Typography
        variant="body-base"
        className="text-start font-normal tracking-[0.01em]"
        color="black_100"
      >
        {descriptionFirst}
        <br />
        {descriptionSecond}
      </Typography>
    </div>
  );
};

export default AdministrateTitle;
