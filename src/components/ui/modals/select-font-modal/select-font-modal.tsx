import { FC, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useTranslation } from "react-i18next";
import { ModalPageRoot, Typography } from "@/components";
import { OPTIONS } from "./data";
import { useShopStore } from "@/store/shop-store";

type Props = {
  showModal: boolean;
  onClose: () => void;
  onFontChange: (
    data: SingleValue<{
      label: string;
      value: string;
    }>
  ) => void;
};

const SelectFontModal: FC<Props> = ({ showModal, onClose, onFontChange }) => {
  const { t } = useTranslation(["step-two-page", "translation"]);
  const [shopStepTwoFieldsData] = useShopStore(state => [
    state.shopStepTwoFieldsData,
  ]);

  const [font, setFont] = useState<string>(shopStepTwoFieldsData.font);

  return (
    <ModalPageRoot showModal={showModal} onClose={onClose}>
      <div className="pt-2">
        <Typography
          variant="heading-md"
          tag="h1"
          color="main_black"
          className="px-4"
        >
          {t("font-type-selection-page.title", { ns: "step-two-page" })}
        </Typography>
        <div className="mt-2">
          <div>
            <div className="bg-main_bg px-4 py-6">
              <p
                className="text-[24px] font-normal leading-[145%] tracking-[-0.03em] text-main_black"
                style={{ fontFamily: font }}
              >
                {t("example-text", { ns: "translation" })}
              </p>
            </div>
            <div className="px-4">
              <Select
                classNamePrefix="select-font-type"
                options={OPTIONS}
                onChange={data => {
                  if (data) {
                    setFont(data.value);
                    onFontChange(data);
                  }
                }}
                menuIsOpen
              />
            </div>
          </div>
        </div>
      </div>
    </ModalPageRoot>
  );
};

export default SelectFontModal;
