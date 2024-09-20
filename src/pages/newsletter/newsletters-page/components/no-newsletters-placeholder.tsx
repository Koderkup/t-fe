import { FC } from "react";
import { useNavigate } from "react-router-dom";
import MailingIcon from "public/icons/mail-open-fill.svg";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";

const NoNewslettersPlaceholder: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("newsletter");

  return (
    <div className="pb-2">
      <div className="h-[330px] w-full bg-newsletter-bg bg-cover" />

      <div className="mx-6">
        <Typography
          tag="h1"
          color="black_100"
          variant="heading-xl"
          className="mb-4 max-w-[100px] font-medium"
        >
          {t("no-newsletter.title")}
        </Typography>

        <Typography tag="p" variant="body-md">
          {t("no-newsletter.description")}
        </Typography>

        <Button
          icon={<MailingIcon />}
          className="mt-[20px]"
          onClick={() => navigate(RoutesPaths.CREATE_NEWSLETTER)}
        >
          {t("no-newsletter.button-text")}
        </Button>
      </div>
    </div>
  );
};

export default NoNewslettersPlaceholder;
