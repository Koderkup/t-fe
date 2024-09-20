import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";

const MainTitle: FC = () => {
  const { t } = useTranslation("main-page");

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="heading-md" tag="h1" color="black_100">
        {t("page-title")}
      </Typography>
      <Typography
        variant="body-base"
        className="font-normal tracking-[0.01em]"
        color="black_100"
      >
        {t("page-description")}
      </Typography>
    </div>
  );
};

export default MainTitle;
