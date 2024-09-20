import { BackButton } from "@twa-dev/sdk/react";
import { FC } from "react";
import { DropdownMenu } from "@/components";
import PaymentMethodList from "./components/payment-method-list";
import { useThirdCretionStepAPI } from "@/hooks/api/useThirdCreationStepAPI";
import useHistoryBack from "@/hooks/useHistoryBack";

const PaymentMethodsPage: FC = () => {
  const {
    functionalities: { data },
  } = useThirdCretionStepAPI();
  const { goBack } = useHistoryBack();

  if (!data) return null;

  return (
    <div className="px-4 py-2">
      <BackButton onClick={goBack} />
      <PaymentMethodList data={data} />
      <DropdownMenu type="step-three" />
    </div>
  );
};

export default PaymentMethodsPage;
