import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useFormContext } from "react-hook-form";
import FieldLabel from "@/components/ui/form/field-label/field-label";
import { THEME_MODE } from "../data";
import { useShopStore } from "@/store/shop-store";
import { Selector } from "@/components";
import { StepTwoFields } from "@/shared/types/types";

const ThemeSelectors: FC = () => {
  const { t } = useTranslation("step-two-page");
  const [shopStepTwoFieldsData] = useShopStore(state => [
    state.shopStepTwoFieldsData,
  ]);

  const { control, watch } = useFormContext<StepTwoFields>();

  const themeData = watch("theme");

  const checkTheme = useMemo(
    () => themeData || shopStepTwoFieldsData.theme,
    [shopStepTwoFieldsData.theme, themeData]
  );

  return (
    <div className="flex flex-col gap-[6px]">
      <FieldLabel label={t("design-settings-page.form.theme-inputs.label")} />
      <div className="flex flex-col gap-2">
        {THEME_MODE.map(el => {
          const Icon = el.icon;
          return (
            <Controller
              key={el.title}
              control={control}
              name="theme"
              render={({ field }) => (
                <Selector
                  validValue={el.value}
                  icon={<Icon />}
                  title={t(el.title)}
                  description={t(el.description)}
                  id={`${el.title}-mode`}
                  onChange={field.onChange}
                  isChecked={checkTheme === el.value}
                  type="theme"
                />
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelectors;
