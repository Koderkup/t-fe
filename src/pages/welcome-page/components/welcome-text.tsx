import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";

const WelcomeText: FC = () => {
  const { t } = useTranslation("welcome-page");

  return (
    <div className="flex w-full flex-col gap-3 bg-welcome-bg bg-cover px-4 pt-[74px]">
      <Typography variant="heading-xl" className="!text-[#7e8089]">
        {t("welcome-page.title")}
        <span className="text-black_100"> Tapply!</span>
      </Typography>
      <Typography variant="body-base" color="black_100" className="font-normal">
        {t("welcome-page.description")}
      </Typography>
    </div>
  );
};

export default WelcomeText;
