import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import MainTitle from "./components/main-title";
import { ControlPanel } from "@/components";
import useHistoryBack from "@/hooks/useHistoryBack";
import ApplicationTypeList from "./components/application-type-list";

const MainPage: FC = () => {
  const { goBack } = useHistoryBack("/");

  return (
    <div className="px-4 pb-[11px] pt-[8px]">
      <BackButton onClick={goBack} />
      <div className="flex flex-col gap-y-4">
        <MainTitle />
        <ApplicationTypeList />
      </div>
      <ControlPanel />
    </div>
  );
};

export default MainPage;
