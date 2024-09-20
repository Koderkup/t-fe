import { FC, useCallback, useState } from "react";
import InputArrow from "public/icons/input-arrow.svg";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SingleValue } from "react-select";
import { Button, InputField, SelectFontModal } from "@/components";
import FormHeading from "./form-heading";
import ColorSelector from "./color-selector";
import ThemeSelectors from "./theme-selectors";
import DesignTextSize from "./design-text-size";
import { useShopStore } from "@/store/shop-store";
import { StepTwoFields } from "@/shared/types/types";
import { useSecondCreationStepAPI } from "@/hooks/api/useSecondCreationStepAPI";

interface CustomizeFormProps {
  name: string;
  description: string;
  price: number;
  mediaUrl: string;
  tags: Array<string>;
}

const CustomizeForm: FC<CustomizeFormProps> = ({
  name,
  description,
  price,
  mediaUrl,
  tags,
}) => {
  const { t } = useTranslation(["step-two-page", "translation"]);
  const { createDesign } = useSecondCreationStepAPI();
  const [shopStepTwoFieldsData, setShopStepTwoFieldsData] = useShopStore(
    state => [state.shopStepTwoFieldsData, state.setShopStepTwoFieldsData]
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  const { register, handleSubmit, setValue } = useFormContext<StepTwoFields>();

  const onSubmit: SubmitHandler<StepTwoFields> = data => {
    setShopStepTwoFieldsData({
      font: data.font || shopStepTwoFieldsData.font,
      highlightColor:
        data.highlightColor || shopStepTwoFieldsData.highlightColor,
      theme: data.theme || shopStepTwoFieldsData.theme,
      textSize: data.textSize || shopStepTwoFieldsData.textSize,
    });
    createDesign.mutate({
      name,
      description,
      price,
      mediaUrl,
      font_style: data.font,
      highlightColor: data.highlightColor,
      theme: data.theme,
      textSize: +data.textSize,
      tags,
    });
  };

  const handleFontSelect = useCallback(
    (
      data: SingleValue<{
        label: string;
        value: string;
      }>
    ) => {
      if (!data) return;

      setValue("font", data.value);
      setShowModal(false);
    },
    [setValue]
  );

  return (
    <div className="mt-6 flex flex-col gap-6">
      <FormHeading />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-screen flex-col justify-between"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 px-4">
            <ThemeSelectors />
            <ColorSelector />
            <div className="relative">
              <InputField
                label={t("design-settings-page.form.font-input", {
                  ns: "step-two-page",
                })}
                defaultValue={shopStepTwoFieldsData.font}
                className="cursor-pointer"
                readOnly
                onClick={() => setShowModal(true)}
                {...register("font")}
              />
              <div className="absolute right-[16px] top-[42.5px]">
                <InputArrow />
              </div>
            </div>
          </div>
          <DesignTextSize />
        </div>
        <div className="mt-6 px-4 py-2">
          <Button type="submit">
            {t("design-settings-page.form.submit-button", {
              price: `$${price.toFixed(2)}`,
              ns: "step-two-page",
            })}
          </Button>
        </div>
      </form>
      <SelectFontModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onFontChange={handleFontSelect}
      />
    </div>
  );
};

export default CustomizeForm;
