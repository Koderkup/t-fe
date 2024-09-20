import { ChangeEvent, FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Selector, Typography } from "@/components";
import { PAYMENT_METHODS } from "../data";
import { useMainStore } from "@/store/main-store";
import { RoutesPaths } from "@/routes/paths.config";

const PaymentMethods: FC = () => {
  const { t } = useTranslation("payment-page");
  const [selectedMethod, setSelectedMethod] = useState("stripe");
  const [setPaymentMethod] = useMainStore(state => [state.setPaymentMethod]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedMethod(e.target.value);
      setPaymentMethod(e.target.value);
    },
    [setPaymentMethod]
  );

  return (
    <div className="mt-4 flex flex-col gap-2 pb-[54px]">
      <Typography
        variant="body-base"
        color="black_60"
        className="font-normal tracking-[0.01em]"
      >
        {t("payment-methods.title")}
      </Typography>
      <div className="flex flex-col gap-2">
        {PAYMENT_METHODS.map(method => {
          const Icon = method.icon;
          return (
            <Selector
              key={method.title}
              onChange={handleChange}
              icon={<Icon />}
              title={method.title}
              description={t(method.description)}
              id={`${method.title.toLowerCase()}-mode`}
              isChecked={selectedMethod === method.title.toLowerCase()}
              type="payment"
              discount={method.title.toLowerCase() === "ton" ? 5 : null}
            />
          );
        })}
      </div>
      {/* <Link className="mt-2 text-end" to={RoutesPaths.TAPPLY_COIN}>
        <Typography
          variant="body-sm"
          color="black_100"
          className="underline underline-offset-[6px]"
        >
          {t("link-text")}
        </Typography>
      </Link> */}
    </div>
  );
};

export default PaymentMethods;
