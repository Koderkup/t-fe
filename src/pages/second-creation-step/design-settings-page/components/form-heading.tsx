import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";

const FormHeading: FC = () => {
  const { t } = useTranslation("step-two-page");

  return (
    <div className="flex flex-col gap-2 px-4">
      <Typography variant="heading-sm" tag="h1" color="main_black">
        {t("design-settings-page.appearance")}
      </Typography>
      <Typography variant="body-base" color="black_90" className="font-normal">
        {t("design-settings-page.explain-text")}
      </Typography>
    </div>
  );
};

export default FormHeading;
