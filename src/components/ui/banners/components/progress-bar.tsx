import { FC } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/twMerge";
import Typography from "@/components/ui/typography/typography";
import { TOTAL_STEPS } from "@/shared/constants";
import { useMainStore } from "@/store/main-store";

const ProgressBar: FC = () => {
  const [currentStep] = useMainStore(state => [state.currentStep]);
  const { t } = useTranslation("welcome-page");

  return (
    <div className="relative mt-4 flex flex-col gap-[10px] px-6">
      <Typography
        variant="body-base"
        tag="h3"
        color="black_100"
        className="font-normal"
      >
        {t("welcome-page.step")} {`${currentStep}/${TOTAL_STEPS}`}
      </Typography>
      <div className="flex gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, index) => (
          <span
            className={cn("h-1 w-full rounded-[2px]", {
              "bg-black_90": index < currentStep || index === currentStep - 1,
              "bg-[#efeff0]": index >= currentStep,
            })}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
