import { FC } from "react";
import { useTranslation } from "react-i18next";
import Typography from "../typography/typography";

interface StepTitleProps {
  currentStep?: number;
  text: string;
}

const StepTitle: FC<StepTitleProps> = ({ currentStep, text }) => {
  const { t } = useTranslation("step-one-page");
  const textArray = text.split("/");

  return (
    <div className="flex w-full flex-col gap-2 bg-welcome-bg bg-cover px-4 py-6">
      {currentStep && (
        <Typography
          variant="body-base"
          tag="h3"
          color="black_100"
          className="font-semibold !leading-[145%]"
        >
          {t("step-one-page.step")} {currentStep}
          <span className="text-[#868890]">/3</span>
        </Typography>
      )}
      <Typography variant="heading-xl" color="black_60">
        {textArray[0]}
        <span className="text-black_100">{textArray[1]}</span>
        {textArray[2]}
      </Typography>
    </div>
  );
};

export default StepTitle;
