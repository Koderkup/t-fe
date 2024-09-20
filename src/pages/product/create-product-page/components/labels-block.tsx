import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import AddIcon from "../../../../../public/icons/add-fill.svg";
import { Label, Typography } from "@/components";
import LabelInput from "./label-input";
import { useMainStore } from "@/store/main-store";
import { CreateProductFields } from "../types";
import { cn } from "@/utils/twMerge";

const labelsPreset = [
  "create-product-page.labelsPreset.last-chance",
  "create-product-page.labelsPreset.new",
  "create-product-page.labelsPreset.sale",
] as const;

const LabelsBlock: FC = () => {
  const { t } = useTranslation("products-pages");
  const [isLabelInputOpen, toggleLabelInput] = useMainStore(state => [
    state.isLabelInputOpen,
    state.toggleLabelInput,
  ]);

  const { setValue, watch } = useFormContext<CreateProductFields>();

  const currentLabel = watch("featuredText");

  const handleLabelSelect = useCallback(
    (value: string) => {
      setValue("featuredText", value);
    },
    [setValue]
  );

  return (
    <div className="flex w-full flex-col gap-y-2">
      <Typography variant="body-md" color="black_80">
        {t("create-product-page.label")}
      </Typography>
      <div className="flex flex-wrap items-center gap-2">
        {labelsPreset.map(elem => (
          <Label
            onClick={() => {
              if (isLabelInputOpen) toggleLabelInput(false);
              handleLabelSelect(t(elem).toUpperCase());
            }}
            selected={currentLabel === t(elem).toUpperCase()}
            key={elem}
            className="uppercase"
          >
            {t(elem)}
          </Label>
        ))}
        <LabelInput
          className={cn(
            isLabelInputOpen
              ? "opacity-1 visible"
              : "invisible absolute opacity-0"
          )}
        />
        <button
          type="button"
          onClick={() => {
            toggleLabelInput(true);
            setValue("featuredText", "");
          }}
          className={cn(
            "flex h-[36px] w-[36px] items-center justify-center rounded-full border border-dashed border-black_100 fill-black_20 p-2.5",
            isLabelInputOpen
              ? "invisible absolute opacity-0"
              : "opacity-1 visible"
          )}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default LabelsBlock;
