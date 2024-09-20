import { FC, useEffect, useMemo, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useTranslation } from "react-i18next";
import {
  InputField,
  ModalPageRoot,
  PageContainer,
  Typography,
} from "@/components";
import { OPTIONS } from "./data";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

type Props = {
  showModal: boolean;
  onClose: () => void;
  onTypeChange: (
    data: SingleValue<{
      label: string;
      value: string;
    }>
  ) => void;
};

const ShopTypeModal: FC<Props> = ({ showModal, onClose, onTypeChange }) => {
  const { t } = useTranslation("step-one-page");

  const [selectedType, setSelectedType] = useState<string>("");
  const [input, setInput] = useState(selectedType);
  const [isActive, setIsActive] = useState<boolean>(false);

  const divElement = useRef(null);

  const optionsData = useMemo(
    () =>
      OPTIONS.map(option => ({
        value: option.value,
        label: t(option.label),
      })),
    [t]
  );

  useOnClickOutside(divElement, () => {
    setIsActive(false);
    setInput(selectedType);
  });

  useEffect(() => {
    setInput(selectedType);
  }, [selectedType]);

  return (
    <ModalPageRoot showModal={showModal} onClose={onClose}>
      <PageContainer>
        <Typography variant="heading-md" tag="h1" color="main_black">
          {t("shop-type-selection-page.title")}
        </Typography>
        <div className="relative z-10 mt-4">
          <InputField
            value={input}
            onFocus={() => setIsActive(true)}
            onChange={e => setInput(e.target.value)}
            placeholder={t("shop-type-selection-page.placeholder")}
            className="!h-[48px] rounded-[20px] border border-black_30 !bg-search bg-[95%] bg-no-repeat text-start text-main_black hover:shadow-none"
          />
          <div ref={divElement}>
            <Select<
              SingleValue<{
                label: string;
                value: string;
              }>
            >
              classNamePrefix="select-shop-type"
              placeholder={t("shop-type-selection-page.placeholder")}
              options={optionsData}
              inputValue={isActive ? input : ""}
              value={
                selectedType
                  ? { value: selectedType, label: selectedType }
                  : null
              }
              onChange={data => {
                if (data) {
                  onTypeChange(data);
                  setSelectedType(data?.label);
                  setInput(selectedType);
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

export default ShopTypeModal;
