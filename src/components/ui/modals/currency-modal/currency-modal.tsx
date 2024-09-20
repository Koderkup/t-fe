import { FC, useMemo, useState } from "react";
import Select, { MultiValue } from "react-select";
import { useTranslation } from "react-i18next";
import {
  ModalPageRoot,
  PageContainer,
  Typography,
  MultiValueContainer,
} from "@/components";
import { currencyArray } from "./data";

type Props = {
  showModal: boolean;
  onClose: () => void;
  selectedOptions: Array<string>;
  onCurrencyChange: (
    value: MultiValue<{ value: string; label: string }>
  ) => void;
};

const CurrencyModal: FC<Props> = ({
  showModal,
  onClose,
  selectedOptions,
  onCurrencyChange,
}) => {
  const { t } = useTranslation("shop-settings-page");

  const defaultOptions = useMemo(
    () => selectedOptions.map(el => ({ value: el, label: el })),
    [selectedOptions]
  );

  const [selectedCurrencies, setSelectedCurrencies] =
    useState<MultiValue<{ label: string; value: string }>>(defaultOptions);

  return (
    <ModalPageRoot showModal={showModal} onClose={onClose}>
      <PageContainer>
        <Typography variant="heading-md" tag="h1" color="black_100">
          {t("modals.currency-modal")}
        </Typography>

        <div className="mt-4">
          <Select
            classNamePrefix="select-shop-type"
            value={selectedCurrencies || null}
            options={currencyArray}
            isMulti
            components={{ MultiValueContainer }}
            hideSelectedOptions={false}
            onChange={data => {
              onCurrencyChange(data);
              setSelectedCurrencies(data);
            }}
            menuIsOpen
          />
        </div>
      </PageContainer>
    </ModalPageRoot>
  );
};

export default CurrencyModal;
