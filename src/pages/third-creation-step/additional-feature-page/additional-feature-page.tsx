import { BackButton } from "@twa-dev/sdk/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import StepTitle from "@/components/ui/step-title/step-title";
import FeaturesList from "./components/features-list";
import { DropdownMenu } from "@/components";
import useHistoryBack from "@/hooks/useHistoryBack";
import { RoutesPaths } from "@/routes/paths.config";
import { useThirdCretionStepAPI } from "@/hooks/api/useThirdCreationStepAPI";

const AdditionalFeaturesPage: FC = () => {
  const { t } = useTranslation("step-three-page");
  const { goBack } = useHistoryBack(
    `${RoutesPaths.CREATE_APP}/${RoutesPaths.SECOND_STEP}`
  );
  const {
    functionalities: { data },
  } = useThirdCretionStepAPI();

  if (!data) return null;

  return (
    <div className="pb-2">
      <BackButton onClick={goBack} />
      <StepTitle text={t("additional-feature-page.title")} />
      <div className="mt-[6px] px-4 pb-[196px]">
        <FeaturesList data={data} />
        <DropdownMenu type="step-three" />
      </div>
    </div>
  );
};

export default AdditionalFeaturesPage;
