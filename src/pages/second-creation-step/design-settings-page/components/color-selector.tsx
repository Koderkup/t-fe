import { FC, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { COLORS } from "../data";
import { Typography } from "@/components";
import { cn } from "@/utils/twMerge";
import { useShopStore } from "@/store/shop-store";
import { StepTwoFields } from "@/shared/types/types";

const ColorSelector: FC = () => {
  const { t } = useTranslation("step-two-page");
  const [shopStepTwoFieldsData] = useShopStore(state => [
    state.shopStepTwoFieldsData,
  ]);

  const checkColor = useMemo(
    () => shopStepTwoFieldsData.highlightColor,
    [shopStepTwoFieldsData.highlightColor]
  );

  const [color, setColor] = useState(shopStepTwoFieldsData.highlightColor);
  const { setValue } = useFormContext<StepTwoFields>();

  useEffect(() => {
    setColor(checkColor);
  }, [checkColor]);

  return (
    <div className="flex flex-col gap-[14px]">
      <Typography variant="body-md" color="black_80" className="font-normal">
        {t("design-settings-page.form.colors-input")}
      </Typography>
      <div className="flex items-center justify-between">
        {COLORS.map(el => (
          <button
            type="button"
            key={el}
            className={cn(
              "rounded-[23px] border-[1px] border-solid border-transparent p-1",
              { "border-black_30": el === color }
            )}
            onClick={() => {
              setColor(el);
              setValue("highlightColor", el);
            }}
          >
            <div
              className="h-[28px] w-[28px] rounded-full"
              style={{ backgroundColor: el }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
