import { FC } from "react";
import NextArrow from "public/icons/next-arrow.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Typography from "@/components/ui/typography/typography";
import { useMainStore } from "@/store/main-store";
import { Button } from "@/components";
import { TOTAL_STEPS } from "@/shared/constants";
import { RoutesPaths } from "@/routes/paths.config";

const ActionButtons: FC = () => {
  const { currentStep, incrementStep, toggleBanners } = useMainStore();
  const { t } = useTranslation("welcome-page");
  const navigate = useNavigate();

  return (
    <div className="mb-[9px] mt-4 flex items-center gap-2 px-6">
      {currentStep !== TOTAL_STEPS && (
        <button
          onClick={() => {
            toggleBanners();
            navigate(RoutesPaths.MAIN);
          }}
          className="px-[33px] py-[14px]"
          type="button"
        >
          <Typography
            variant="body-base"
            color="black_100"
            className="font-semibold"
          >
            {t("welcome-page.skip")}
          </Typography>
        </button>
      )}
      <Button
        variant="primary"
        onClick={() => {
          if (currentStep !== TOTAL_STEPS) {
            incrementStep();
          } else {
            toggleBanners();
            navigate(RoutesPaths.MAIN);
          }
        }}
        className="flex-row-reverse"
        type="button"
        icon={<NextArrow />}
      >
        {currentStep === TOTAL_STEPS
          ? t("welcome-page.get-started")
          : t("welcome-page.next")}
      </Button>
    </div>
  );
};

export default ActionButtons;
