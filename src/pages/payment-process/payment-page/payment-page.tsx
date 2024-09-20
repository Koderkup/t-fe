import { BackButton } from "@twa-dev/sdk/react";
import { FC } from "react";
import useHistoryBack from "@/hooks/useHistoryBack";
import PaymentMethods from "./components/payment-methods";
import PaymentInformation from "./components/payment-information";
import PaymentsActionSheet from "./components/payments-action-sheet";
import { RoutesPaths } from "@/routes/paths.config";

const PaymentPage: FC = () => {
  const { goBack } = useHistoryBack(
    `${RoutesPaths.CREATE_APP}/${RoutesPaths.THIRD_STEP}`
  );

  return (
    <div className="flex h-screen flex-col justify-between gap-y-[18px] pb-[9px]">
      <BackButton onClick={goBack} />
      <div>
        <div className="px-4">
          <PaymentInformation />
          <PaymentMethods />
        </div>
      </div>
      <PaymentsActionSheet />
      <div className="absolute left-0 top-0 z-[5] h-[241px] max-h-[140px] w-full overflow-hidden bg-welcome-bg bg-cover bg-center" />
    </div>
  );
};

export default PaymentPage;
