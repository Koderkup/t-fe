import { FC, useCallback, useEffect, useState } from "react";
import { MultiValue, SingleValue } from "react-select";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputField, TextareaField } from "@/components";
import InputArrow from "../../../../public/icons/input-arrow.svg";
import InputQuestion from "../../../../public/icons/input-question.svg";
import CurrencyModal from "@/components/ui/modals/currency-modal/currency-modal";
import CountryModal from "@/components/ui/modals/country-modal/country-modal";
import MediaBlock from "./media-block";
import { ShopSettingsFileds } from "@/shared/types/shop.interface";

interface ShopSettingsFormProps {
  currency: Array<string>;
  country: string;
}

const ShopSettingsForm: FC<ShopSettingsFormProps> = ({ currency, country }) => {
  const { t } = useTranslation(["shop-settings-page", "translation"]);

  const [showModal, setShowModal] = useState({
    "country-modal": false,
    "currency-modal": false,
  });
  const [currencyInput, setCurrencyInput] = useState("");

  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext<ShopSettingsFileds>();

  const handleCurrencySelect = useCallback(
    (data: MultiValue<{ value: string; label: string }>) => {
      if (!data) return;
      if (errors.currency?.message) clearErrors("currency");

      const inputData = data.map(el => el.value);
      setCurrencyInput(inputData.join(", "));
      setValue("currency", inputData);
    },
    [clearErrors, errors.currency?.message, setValue]
  );

  const handleCountrySelect = useCallback(
    (
      data: SingleValue<{
        label: string;
        value: string;
      }>
    ) => {
      if (!data) return;
      if (errors.country?.message) clearErrors("country");

      setValue("countryValue", data.value);
      setValue("country", data.label);
      setShowModal(prev => ({
        ...prev,
        "country-modal": false,
      }));
    },
    [clearErrors, errors.country?.message, setValue]
  );

  useEffect(() => {
    if (currency) setCurrencyInput(currency.join(","));
  }, [currency]);

  return (
    <div>
      <form className="mb-5 mt-4">
        <div className="flex flex-col gap-y-4">
          <MediaBlock />
          <InputField
            label={t("inputs.name", { ns: "shop-settings-page" })}
            className="border-[#efeff0]"
            error={!!errors.shopName}
            helperText={errors.shopName?.message}
            {...register("shopName", {
              required: t("error-messages.required", { ns: "translation" }),
            })}
          />
          <div className="relative">
            <InputField
              label={t("inputs.bot-token", { ns: "shop-settings-page" })}
              className="border-[#efeff0]"
              error={!!errors.botToken}
              helperText={errors.botToken?.message}
              {...register("botToken", {
                required: t("error-messages.required", { ns: "translation" }),
              })}
              rightIcon={<InputQuestion />}
            />
          </div>
          <TextareaField
            label={t("inputs.description")}
            className="border-[#efeff0]"
            placeholder={t("inputs.input-placeholder", {
              ns: "shop-settings-page",
              inputName: t("inputs.description", {
                ns: "shop-settings-page",
              }).toLowerCase(),
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register("description", {
              required: t("error-messages.required", { ns: "translation" }),
            })}
          />
          <div className="relative">
            <InputField
              label={t("inputs.country", { ns: "shop-settings-page" })}
              className="cursor-pointer border-[#efeff0]"
              error={!!errors.country}
              helperText={errors.country?.message}
              placeholder={t("inputs.select-placeholder", {
                ns: "shop-settings-page",
                inputName: t("inputs.country", { ns: "shop-settings-page" })
                  .split("*")[0]
                  .toLowerCase(),
              })}
              onClick={e => {
                e.stopPropagation();
                setShowModal(prev => ({ ...prev, "country-modal": true }));
              }}
              {...register("country", {
                required: t("error-messages.required", { ns: "translation" }),
              })}
              readOnly
            />
            <div className="absolute right-[16px] top-[42.5px]">
              <InputArrow />
            </div>
          </div>
          <div className="relative">
            <InputField
              label={t("inputs.currency*")}
              placeholder={t("inputs.select-placeholder", {
                ns: "shop-settings-page",
                inputName: t("inputs.currency*", { ns: "shop-settings-page" })
                  .split("*")[0]
                  .toLowerCase(),
              })}
              className="cursor-pointer border-[#efeff0]"
              defaultValue={currencyInput}
              {...register("currency", {
                required: t("error-messages.required", { ns: "translation" }),
              })}
              error={!!errors.currency}
              helperText={errors.currency?.message}
              onClick={e => {
                e.stopPropagation();
                setShowModal(prev => ({ ...prev, "currency-modal": true }));
              }}
              readOnly
            />
            <div className="absolute right-[16px] top-[42.5px]">
              <InputArrow />
            </div>
          </div>
        </div>
      </form>

      <CurrencyModal
        showModal={showModal["currency-modal"]}
        selectedOptions={currency}
        onClose={() =>
          setShowModal(prev => ({
            ...prev,
            "currency-modal": false,
          }))
        }
        onCurrencyChange={handleCurrencySelect}
      />

      <CountryModal
        showModal={showModal["country-modal"]}
        selectedValue={country}
        onClose={() =>
          setShowModal(prev => ({
            ...prev,
            "country-modal": false,
          }))
        }
        onCountryChange={handleCountrySelect}
      />
    </div>
  );
};

export default ShopSettingsForm;
