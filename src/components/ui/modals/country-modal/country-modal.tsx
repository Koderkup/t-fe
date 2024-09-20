import { FC, useEffect, useMemo, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useTranslation } from "react-i18next";
import {
  InputField,
  ModalPageRoot,
  PageContainer,
  Typography,
} from "@/components";
import useCountriesList from "@/hooks/useCountriesList";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

type Props = {
  showModal: boolean;
  onClose: () => void;
  selectedValue?: string;
  onCountryChange: (
    data: SingleValue<{
      label: string;
      value: string;
    }>
  ) => void;
};

const CountryModal: FC<Props> = ({
  showModal,
  onClose,
  onCountryChange,
  selectedValue,
}) => {
  const { i18n, t } = useTranslation("shop-settings-page");
  const { countryArr } = useCountriesList(i18n.language);
  const selectedCountry = useMemo(
    () =>
      countryArr
        .flatMap(el => el.options)
        .find(country => country.value === selectedValue),
    [countryArr, selectedValue]
  );

  const [value, setValue] = useState<{ label: string; value: string } | null>(
    selectedCountry || null
  );
  const [input, setInput] = useState(value?.label);
  const [isActive, setIsActive] = useState<boolean>(false);

  const divElement = useRef(null);

  useOnClickOutside(divElement, () => {
    setIsActive(false);
    setInput(value?.label);
  });

  useEffect(() => {
    setInput(value?.label);
  }, [value?.label]);

  return (
    <ModalPageRoot showModal={showModal} onClose={onClose}>
      <PageContainer>
        <Typography variant="heading-md" tag="h1" color="black_100">
          {t("modals.country-modal")}
        </Typography>
        <div className="relative z-10 mt-4">
          <InputField
            value={input}
            onFocus={() => setIsActive(true)}
            onChange={e => setInput(e.target.value)}
            className="!h-[48px] rounded-[20px] border border-[#efeff0] !bg-search bg-[95%] bg-no-repeat text-start text-main_black hover:shadow-none"
          />
          <div ref={divElement}>
            <Select<
              SingleValue<{
                label: string;
                value: string;
              }>
            >
              classNamePrefix="select-shop-type"
              options={countryArr}
              inputValue={isActive ? input : ""}
              value={value || selectedCountry}
              onChange={data => {
                if (data) {
                  setValue(data);
                  onCountryChange(data);
                  setInput(data.label);
                  setIsActive(false);
                }
              }}
              styles={{
                control: baseStyles => ({
                  ...baseStyles,
                  opacity: 0,
                  visibility: "hidden",
                  position: "absolute",
                }),
              }}
              menuIsOpen
            />
          </div>
        </div>
      </PageContainer>
    </ModalPageRoot>
  );
};

export default CountryModal;
