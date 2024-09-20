import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import ConfirmationText from "./components/confirmation-text";
import useHistoryBack from "@/hooks/useHistoryBack";
import ConfirmationNavigation from "./components/confirmation-navigation";
import { RoutesPaths } from "@/routes/paths.config";

const PaymentConfirmationPage: FC = () => {
  const { goBack } = useHistoryBack(
    `${RoutesPaths.CREATE_APP}/${RoutesPaths.CREATION_PAYMENT}`
  );

  return (
    <div>
      <BackButton onClick={goBack} />
      <div className="flex h-screen flex-col justify-between gap-[53px]">
        <ConfirmationText />
        <ConfirmationNavigation />
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
