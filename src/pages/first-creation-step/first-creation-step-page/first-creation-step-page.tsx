import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import StepOneForm from "./components/step-one-form";
import useHistoryBack from "@/hooks/useHistoryBack";
import { RoutesPaths } from "@/routes/paths.config";
import { useMainStore } from "@/store/main-store";

const FirstCreationStepPage: FC = () => {
  const { goBack } = useHistoryBack(RoutesPaths.MAIN);
  const [isModalOpen] = useMainStore(state => [state.isModalOpen]);

  return (
    <div className="pb-[9px]">
      <BackButton
        onClick={() => {
          if (!isModalOpen) goBack();
        }}
      />
      <StepOneForm />
    </div>
  );
};

export default FirstCreationStepPage;
