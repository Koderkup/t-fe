import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";
import { useShopStore } from "@/store/shop-store";
import { StepTwoFields } from "@/shared/types/types";

const DesignTextSize: FC = () => {
  const { t } = useTranslation(["step-two-page", "translation"]);
  const [shopStepTwoFieldsData] = useShopStore(state => [
    state.shopStepTwoFieldsData,
  ]);

  const [fontSize, setFontSize] = useState(shopStepTwoFieldsData.textSize);

  const { setValue } = useFormContext<StepTwoFields>();

  const progres = ((+fontSize - 5) / (25 - 5)) * 100;

  useEffect(() => {
    setFontSize(shopStepTwoFieldsData.textSize);
  }, [shopStepTwoFieldsData.textSize]);

  return (
    <div className="mb-6 flex flex-col gap-[6px]">
      <Typography
        variant="body-md"
        color="black_100"
        className="px-4 font-normal"
      >
        {t("design-settings-page.form.tex-size-input", { ns: "step-two-page" })}
      </Typography>
      <div className="bg-main_bg px-4 py-6">
        <p
          className="text-[18px] font-normal leading-[145%] tracking-[-0.04em] text-main_black"
          style={{ fontFamily: "Inter", fontSize }}
        >
          {t("example-text", { ns: "translation" })}
        </p>
      </div>
      <div className="my-4 flex items-center gap-2 px-4">
        <Typography variant="body-md" className="font-normal" color="black_100">
          Aa
        </Typography>
        <div className="relative flex w-full items-center">
          <input
            type="range"
            className="text-size-input"
            min={5}
            max={25}
            step={5}
            value={fontSize}
            onChange={e => {
              setFontSize(+e.target.value);
              setValue("textSize", +e.target.value);
            }}
            style={{
              background: `linear-gradient(to right, #272e37 ${progres}%, #d9d9d9 ${progres}%)`,
            }}
          />
          <div className="absolute top-[-4px] flex w-full justify-between">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="h-[10px] w-[2px] bg-black_100" />
            ))}
          </div>
        </div>
        <Typography
          variant="body-2xl"
          className="font-normal"
          color="black_100"
        >
          Aa
        </Typography>
      </div>
    </div>
  );
};

export default DesignTextSize;
