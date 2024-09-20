import { FC, useState } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  InputField,
  PageContainer,
  PageInfo,
  PaymentSystemsModal,
  SimpleCell,
  Typography,
} from "@/components";
import InputArrow from "../../../public/icons/input-arrow.svg";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { cryptoData, fiatData } from "@/pages/payment-systems/data.ts";
import Switch from "@/components/ui/form/switch/switch.tsx";
import { PaymentSystemModalType } from "@/pages/payment-systems/types.ts";
import { useMainStore } from "@/store/main-store";

const PaymentSystems: FC = () => {
  const { t } = useTranslation("payment-systems-page");
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const [showModal, setShowModal] = useState<PaymentSystemModalType | null>(
    null
  );
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState<string[]>([]);
  const [selectedFiat, setSelectedFiat] = useState<string[]>([]);

  const handlePaymentSystemChange = (
    value: string,
    modalType: PaymentSystemModalType,
    isSelected: boolean
  ) => {
    const callback =
      modalType === "crypto" ? setSelectedCrypto : setSelectedFiat;

    if (isSelected) {
      callback(prevState => [...prevState, value]);
    } else {
      const index = selectedCrypto.indexOf(value);

      if (index !== -1) {
        const newArr = [...selectedCrypto];
        newArr.splice(index, 1);
        callback(newArr);
      }
    }
  };

  const renderPaymentsList = () => {
    if (!showModal) return null;

    switch (showModal) {
      case "crypto": {
        return cryptoData.map(elem => {
          const isSelected = selectedCrypto.includes(elem.abbreviation);

          return (
            <SimpleCell
              key={elem.abbreviation}
              after={
                <Switch
                  name={elem.abbreviation}
                  defaultChecked={isSelected}
                  onChange={e => {
                    handlePaymentSystemChange(
                      elem.abbreviation,
                      "crypto",
                      e.target.checked
                    );
                  }}
                />
              }
              title={
                <Typography variant="body-base" color="black_100">
                  {`${elem.abbreviation} (${elem.currency})`}
                </Typography>
              }
              showBorderBottom
              className="items-center"
            />
          );
        });
      }
      case "fiat": {
        return fiatData.map(elem => {
          const isSelected = selectedCrypto.includes(elem.method);

          return (
            <SimpleCell
              key={elem.method}
              after={
                <Switch
                  name={elem.method}
                  defaultChecked={isSelected}
                  onChange={e => {
                    handlePaymentSystemChange(
                      elem.method,
                      "fiat",
                      e.target.checked
                    );
                  }}
                />
              }
              title={
                <Typography variant="body-base" color="black_100">
                  {elem.method}
                </Typography>
              }
              showBorderBottom
              className="items-center"
            />
          );
        });
      }

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <BackButton
        onClick={() => {
          if (!showModal) {
            navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`);
          }
        }}
      />

      <PageInfo title={t("title")} />

      <div className="mt-4 flex flex-col gap-y-4">
        <div className="relative">
          <InputField
            id="crypto"
            label={t("crypto-input")}
            onClick={() => setShowModal("crypto")}
            className="cursor-pointer bg-transparent [&_input:disabled]:opacity-100"
            placeholder={t("crypto-input-placeholder")}
            defaultValue={selectedCrypto.concat().join(", ")}
            autoComplete="off"
            disabled
          />
          <div className="absolute right-[16px] top-[42.5px]">
            <InputArrow />
          </div>
        </div>

        <div className="relative">
          <InputField
            id="fiat"
            label={t("fiat-input")}
            onClick={() => setShowModal("fiat")}
            className="cursor-pointer bg-transparent [&_input:disabled]:opacity-100"
            placeholder={t("fiat-input-placeholder")}
            autoComplete="off"
            defaultValue={selectedFiat.concat().join(", ")}
            disabled
          />
          <div className="absolute right-[16px] top-[42.5px]">
            <InputArrow />
          </div>
        </div>
      </div>

      <PaymentSystemsModal
        showModal={!!showModal}
        onClose={() => setShowModal(null)}
        type={showModal}
      >
        {renderPaymentsList()}
      </PaymentSystemsModal>
    </PageContainer>
  );
};

export default PaymentSystems;
