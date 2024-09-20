import { BackButton } from "@twa-dev/sdk/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StepTitle from "@/components/ui/step-title/step-title";
import DesignVariants from "./components/design-variants";

const SecondCreationStepPage: FC = () => {
  const { t } = useTranslation("step-two-page");
  const navigate = useNavigate();

  return (
    <div className="pb-2">
      <BackButton onClick={() => navigate("/")} />
      <StepTitle text={t("step-two-page.title")} currentStep={2} />
      <DesignVariants />
    </div>
  );
};

export default SecondCreationStepPage;
