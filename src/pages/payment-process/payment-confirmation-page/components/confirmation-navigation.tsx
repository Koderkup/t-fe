import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@/components";
import useHistoryBack from "@/hooks/useHistoryBack";

const ConfirmationNavigation: FC = () => {
  const { t } = useTranslation("payment-page");
  const { goBack } = useHistoryBack("/");

  return (
    <div className="flex flex-col gap-y-[9px] px-4">
      <Typography
        className="text-center font-normal"
        variant="body-sm"
        color="black_60"
      >
        {t("payment-confirmation.link.text")}
        <Link className="ml-[3px] underline underline-offset-2" to="https://t.me/tapply_support">
          {t("payment-confirmation.link.href")}
        </Link>
      </Typography>
      <div className="py-2">
        <Button onClick={goBack} type="button">
          {t("payment-confirmation.button-text")}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationNavigation;
