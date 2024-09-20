import { FC, useId, useMemo } from "react";
import Select from "react-select";
import AddIcon from "public/icons/add-fill.svg";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MuiColorInput } from "mui-color-input";
import InputField from "@/components/ui/form/input-field/input-field";
import Button from "@/components/ui/button/button";
import DeleteOptionBlock from "./delete-option-block";
import { AttributesFields } from "@/shared/types/product.interface";
import FieldControl from "@/components/ui/form/field-control/field-control";
import { useMainStore } from "@/store/main-store";
import Typography from "@/components/ui/typography/typography";

const AttributeForm: FC = () => {
  const { t } = useTranslation(["products-pages", "translation"]);
  const [attributes] = useMainStore(state => [state.attributes]);
  const id = useId();

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<AttributesFields>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const attributeName = watch("attributeName");

  const options = [
    {
      label: t("attribute-modal.form.name.options.color"),
      value: "Color",
    },
    { label: t("attribute-modal.form.name.options.size"), value: "Size" },
  ];

  const selectOptions = useMemo(() => {
    const hasSize = attributes.some(el => el.attributeName === "Size");
    const hasColor = attributes.some(el => el.attributeName === "Color");

    if (hasColor && attributes.length > 0) {
      return [
        { label: t("attribute-modal.form.name.options.size"), value: "Size" },
      ];
    }
    if (hasSize && attributes.length > 0) {
      return [
        {
          label: t("attribute-modal.form.name.options.color"),
          value: "Color",
        },
      ];
    }
    return [
      {
        label: t("attribute-modal.form.name.options.color"),
        value: "Color",
      },
      { label: t("attribute-modal.form.name.options.size"), value: "Size" },
    ];
  }, [attributes, t]);

  return (
    <div>
      <form className="mb-6 mt-4">
        <FieldControl
          label={t("attribute-modal.form.name.label", { ns: "products-pages" })}
        >
          <Controller
            name="attributeName"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  isDisabled={attributes.length === 2}
                  placeholder={t("create-product-page.category-placeholder")}
                  classNamePrefix="select"
                  options={selectOptions}
                  noOptionsMessage={() => "No options..."}
                  isClearable
                  value={options.find(c => c.value === field.value)}
                  onChange={val => field.onChange(val?.value)}
                />
              );
            }}
          />
        </FieldControl>
        <div className="flex flex-col">
          {fields.map((optionField, idx) => (
            <div key={optionField.id} className="mt-6">
              <DeleteOptionBlock
                optionNumber={idx + 1}
                clickFn={() => remove(idx)}
              />
              <div className="flex flex-col gap-y-4">
                <InputField
                  label={t("attribute-modal.form.feature.label", {
                    ns: "products-pages",
                  })}
                  className="border-black_10"
                  placeholder={t("attribute-modal.form.feature.placeholder", {
                    ns: "products-pages",
                  })}
                  error={!!errors.options?.[idx]?.name}
                  helperText={errors.options?.[idx]?.name?.message}
                  {...register(`options.${idx}.name`, {
                    required: t("error-messages.required", {
                      ns: "translation",
                    }),
                  })}
                />
                {attributeName === "Color" && (
                  <div className="flex w-full flex-col">
                    <label className="mb-1.5 block text-start" htmlFor={id}>
                      <Typography variant="body-md" color="black_80">
                        {t("attribute-modal.form.hexCode.label", {
                          ns: "products-pages",
                        })}
                      </Typography>
                    </label>
                    <Controller
                      name={`options.${idx}.hexCode`}
                      control={control}
                      rules={{
                        required: t("error-messages.required", {
                          ns: "translation",
                        }),
                      }}
                      render={({ field }) => {
                        return (
                          <MuiColorInput
                            {...field}
                            value={field.value || ""}
                            error={!!errors.options?.[idx]?.hexCode}
                            placeholder={t(
                              "attribute-modal.form.hexCode.placeholder",
                              {
                                ns: "products-pages",
                              }
                            )}
                            helperText={errors.options?.[idx]?.hexCode?.message}
                            format="hex"
                            className="color-input"
                            onChange={value => field.onChange(value)}
                          />
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
      <Button
        variant="outline"
        onClick={() =>
          attributeName === "Size"
            ? append({
                name: "",
              })
            : append({
                name: "",
                hexCode: "",
              })
        }
        icon={
          <span className="fill-black_20">
            <AddIcon />
          </span>
        }
      >
        {t("attribute-modal.action-buttons.add-option", {
          ns: "products-pages",
        })}
      </Button>
    </div>
  );
};

export default AttributeForm;
