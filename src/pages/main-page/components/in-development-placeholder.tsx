import { FC } from "react";
import TimeIcon from "public/icons/time-line.svg";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@/components";

const InDevelopmentPlaceholder: FC = () => {
  const { t } = useTranslation("main-page");

  return (
    <div className="in-development absolute inset-0 z-10 rounded-3xl border border-solid border-stroke backdrop-blur-[6px]">
      <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2">
        <Button variant="rounded">
          <TimeIcon />
        </Button>

        <Typography variant="heading-sm" color="black_100">
          {t("in-development")}
        </Typography>
      </div>
    </div>
  );
};

export default InDevelopmentPlaceholder;
