import { BackButton } from "@twa-dev/sdk/react";
import { FC, useMemo } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { stripe, stripePromise } from "@/lib/stripe";
import { useShopStore } from "@/store/shop-store";
import { useUserPaymentAPI } from "@/hooks/api/useUserPaymentAPI";
import { useTelegram } from "@/hooks/useTelegram";
import { useUserAPI } from "@/hooks/api/useUserAPI";
import { RoutesPaths } from "@/routes/paths.config";

const StripeCheckoutFormPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useTelegram();
  const {
    getUserByTelegramId: { data },
  } = useUserAPI(user?.id);
  const { createUserPayment } = useUserPaymentAPI();
  const [shopId, shopStepTwoFieldsData] = useShopStore(state => [
    state.shopId,
    state.shopStepTwoFieldsData,
  ]);

  const functionalityIds = useMemo(
    () =>
      shopStepTwoFieldsData.features.map(el =>
        el.featureId ? +el.featureId : 1
      ) as Array<number>,
    [shopStepTwoFieldsData.features]
  );

  const handleComplete = async () => {
    const checkoutData = await stripe.checkout.sessions.retrieve(
      `${location.state.sessionId}`
    );

    if (checkoutData.status === "complete") {
      createUserPayment.mutate({
        paymentIdentifier: checkoutData.customer_details?.name || "",
        paymentMethod: "stripe",
        shopId,
        userId: data?.id || "",
        designId: shopStepTwoFieldsData.visualDesignFeature?.featureId || "",
        currency: checkoutData.currency?.toUpperCase() || "",
        totalPrice: shopStepTwoFieldsData.totalPrice,
        functionalityIds,
      });

      navigate(
        `${RoutesPaths.CREATE_APP}/${RoutesPaths.PAYMENT_CONFIRAMTION}`,
        { replace: true }
      );
    }
  };

  const options = useMemo(
    () => ({
      clientSecret: `${location.state.clientSecret}`,
      onComplete: handleComplete,
    }),
    [location.state.clientSecret]
  );

  const handleNavigateBack = () => {
    window.history.back();
  };

  return (
    <>
      <BackButton onClick={handleNavigateBack} />
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </>
  );
};

export default StripeCheckoutFormPage;
