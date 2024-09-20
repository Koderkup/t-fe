import { FC } from "react";
import QuestionMark from "public/icons/question-line.svg";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react";
import { ControlPanel, Typography } from "@/components";
import AppSettingForm from "@/pages/app-settings/components/app-setting-form.tsx";
import { RoutesPaths } from "@/routes/paths.config";
import usePreloadTranslation from "@/hooks/usePreloadTranslation";

const AppSettings: FC = () => {
  const { t } = useTranslation("translation");
  const { preloadFn } = usePreloadTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="px-4 pt-2">
        <BackButton onClick={() => navigate(RoutesPaths.MAIN)} />
        <Typography variant="heading-md" tag="h1" color="black_100">
          {t("app-settings-page.page-title")}
        </Typography>

        <div className="mt-4">
          <div className="flex justify-between py-2.5 pr-2">
            <Typography variant="body-md" color="gray_10">
              {t("app-settings-page.balance")}
            </Typography>

            <Link
              to={RoutesPaths.TAPPLY_COIN}
              onClick={e => {
                e.preventDefault();
                preloadFn("payment-page", RoutesPaths.TAPPLY_COIN);
              }}
            >
              <QuestionMark />
            </Link>
          </div>

          <Typography variant="heading-lg" color="black_100">
            $TPL 120.00
          </Typography>
        </div>
      </div>

      <AppSettingForm />
      <ControlPanel />
    </>
  );
};

export default AppSettings;
