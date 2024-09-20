import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { Button } from "@/components";
import { useMainStore } from "@/store/main-store";
import { useShopStore } from "@/store/shop-store";
import { stripe } from "@/lib/stripe";
import { RoutesPaths } from "@/routes/paths.config";
import useTonTransaction from "@/hooks/useTonTransaction";
import usePreloadTranslation from "@/hooks/usePreloadTranslation";
import { useUserPaymentAPI } from "@/hooks/api/useUserPaymentAPI";
import { useTelegram } from "@/hooks/useTelegram";
import { useUserAPI } from "@/hooks/api/useUserAPI";

const PaymentsActionSheet: FC = () => {
  const { t } = useTranslation(["payment-page", "translation"]);
  const { user } = useTelegram();
  const {
    getUserByTelegramId: { data },
  } = useUserAPI(user?.id || "");
  const { preloadFn } = usePreloadTranslation();
  const { createUserPayment } = useUserPaymentAPI();
  const { sendTransaction } = useTonTransaction();
  const [paymentMethod] = useMainStore(state => [state.paymentMethod]);
  const [shopStepTwoFieldsData, shopId] = useShopStore(state => [
    state.shopStepTwoFieldsData,
    state.shopId,
  ]);
  const { visualDesignFeature, features, totalPrice } = shopStepTwoFieldsData;

  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const navigate = useNavigate();

  const functionalityIds = useMemo(
    () =>
      shopStepTwoFieldsData.features.map(el =>
        el.featureId ? +el.featureId : 1
      ) as Array<number>,
    [shopStepTwoFieldsData.features]
  );

  const allFeatures = useMemo(
    () => (visualDesignFeature ? [visualDesignFeature, ...features] : features),
    [features, visualDesignFeature]
  );

  const stripeCheckout = async () => {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: allFeatures.map(feature => ({
        price_data: {
          currency: "USD",
          product_data: {
            name: feature.featureTitle,
            description: feature.featureText,
          },
          unit_amount: Number(feature.featurePrice.toFixed(2)) * 100,
        },
        quantity: 1,
      })),
      mode: "payment",
      redirect_on_completion: "never",
    });

    navigate(RoutesPaths.STRIPE, {
      state: { clientSecret: session.client_secret, sessionId: session.id },
    });
  };

  const handleClick = async () => {
    switch (paymentMethod) {
      case "stripe":
        stripeCheckout();
        break;
      case "ton":
        if (!wallet) {
          await tonConnectUI.openModal();
        } else {
          const result = await sendTransaction({
            messages: [
              {
                address: import.meta.env.VITE_TON_WALLET_ADDRESS,
                amount: "1000000",
              },
            ],
            validUntil: Date.now() + 10 * 60 * 1000,
          });

          if (result?.boc) {
            createUserPayment.mutate({
              paymentMethod: "ton",
              paymentIdentifier: wallet?.account.address || "",
              functionalityIds,
              designId: visualDesignFeature?.featureId || "",
              shopId,
              userId: data?.id || "",
              totalPrice,
            });
            preloadFn(
              "payment-confirmation-page",
              `${RoutesPaths.CREATE_APP}/${RoutesPaths.PAYMENT_CONFIRAMTION}`
            );
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-white px-4 py-2.5">
      {wallet?.account.address && paymentMethod === "ton" ? (
        <Button onClick={handleClick}>
          <TonConnectButton className="!w-full [&_button]:w-full [&_div]:w-full" />
        </Button>
      ) : (
        <Button onClick={handleClick}>
          {t("action", { ns: "payment-page" })}
        </Button>
      )}
    </div>
  );
};

export default PaymentsActionSheet;
