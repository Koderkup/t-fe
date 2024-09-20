import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";

const ConfirmationText: FC = () => {
  const { t } = useTranslation("payment-page");

  return (
    <div>
      <div className="h-[297px] w-full bg-confirmation-bg bg-cover bg-[center_80%]" />
      <div className="flex flex-col gap-y-4 px-6">
        <Typography
          tag="h1"
          variant="heading-xl"
          color="black_100"
          className="text-center"
        >
          {t("payment-confirmation.page-title")}
        </Typography>
        <Typography
          tag="p"
          variant="body-base"
          color="black_100"
          className="text-center font-normal tracking-[0.01em]"
        >
          {t("payment-confirmation.page-description")}
        </Typography>
        <div className="rounded-2xl border border-solid border-stroke bg-main_bg px-4 py-2.5 text-center">
          <Typography
            tag="p"
            variant="body-xl"
            className="font-normal"
            color="main_black"
          >
            {t("payment-confirmation.page-cell")}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationText;
