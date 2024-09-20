import { FC, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputArrow from "public/icons/input-arrow.svg";
import { useTranslation } from "react-i18next";
import { SingleValue } from "react-select";
import { Button, InputField, ShopTypeModal, TextareaField } from "@/components";
import {
  EMAIL_VALIDATION_PATTERN,
  PHONE_NUMBER_VALIDATION_PATTERN,
} from "@/shared/constants";
import { StepOneFields } from "@/shared/types/types";
import StepTitle from "@/components/ui/step-title/step-title";
import { useTelegram } from "@/hooks/useTelegram";
import { useFirstCreationStepAPI } from "@/hooks/api/useFirstCreationStepAPI";
import { AppCfg } from "@/shared/types/creation-steps.interface";
import { useUserAPI } from "@/hooks/api/useUserAPI";
import BotTokenLinks from "./bot-token-links";

const StepOneForm: FC = () => {
  const { t } = useTranslation(["step-one-page", "translation"]);
  const { user } = useTelegram();
  const {
    getUserByTelegramId: { data },
  } = useUserAPI(user?.id);
  const { createFirstStep } = useFirstCreationStepAPI();
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useForm<StepOneFields>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<StepOneFields> = values => {
    const shopCreationData = {
      name: values.shopName,
      type: getValues("shopTypeValue") || "",
      description: values.description,
      telegramId: user?.id.toString() || "",
      userId: data?.id || "",
    };

    const formData = new FormData();
    formData.append("name", shopCreationData.name);
    formData.append("type", shopCreationData.type);
    formData.append("description", shopCreationData.description);
    formData.append("telegramId", shopCreationData.telegramId);
    formData.append("userId", shopCreationData.userId);

    const configuration: AppCfg = {
      location: values.address,
      email: values.email,
      phoneNumber: values.phoneNumber,
      shopCurrencies: [],
      botToken: values.botToken,
      shopId: "",
    };

    createFirstStep.mutate({
      data: formData,
      configuration,
    });
  };

  const handleTypeSelect = useCallback(
    (
      selectData: SingleValue<{
        label: string;
        value: string;
      }>
    ) => {
      if (!selectData) return;
      if (errors.shopType) clearErrors("shopType");

      setShowModal(false);
      setValue("shopType", selectData.label, { shouldValidate: true });
      setValue("shopTypeValue", selectData.value);
    },
    [clearErrors, errors.shopType, setValue]
  );

  return (
    <>
      <div className="flex h-screen flex-col justify-between gap-y-[23px]">
        <div>
          <StepTitle text={t("step-one-page.title")} currentStep={1} />
          <form className="mt-[6px] flex flex-col gap-y-4 px-4">
            <div>
              <InputField
                placeholder={t("step-one-page.placeholder-3")}
                label={t("step-one-page.step-one-form.botToken")}
                error={!!errors.botToken}
                helperText={errors.botToken?.message}
                {...register("botToken", {
                  required: t("error-messages.required", { ns: "translation" }),
                })}
              />
              <BotTokenLinks />
            </div>

            <InputField
              placeholder={t("step-one-page.placeholder", {
                name: t(
                  "step-one-page.step-one-form.shop-name-input"
                ).toLowerCase(),
                ns: "step-one-page",
              })}
              label={t("step-one-page.step-one-form.shop-name-input", {
                ns: "step-one-page",
              })}
              error={!!errors.shopName}
              helperText={errors.shopName?.message}
              {...register("shopName", {
                required: t("error-messages.required", { ns: "translation" }),
              })}
            />
            <InputField
              placeholder={t("step-one-page.placeholder-2", {
                ns: "step-one-page",
                inputName: t("step-one-page.step-one-form.address-input", {
                  ns: "step-one-page",
                }).toLowerCase(),
              })}
              label={t("step-one-page.step-one-form.address-input", {
                ns: "step-one-page",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register("address", {
                required: t("error-messages.required", { ns: "translation" }),
              })}
            />
            <InputField
              placeholder={t("step-one-page.placeholder", {
                name: t(
                  "step-one-page.step-one-form.phone-number-input"
                ).toLowerCase(),
                ns: "step-one-page",
              })}
              label={t("step-one-page.step-one-form.phone-number-input", {
                ns: "step-one-page",
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              {...register("phoneNumber", {
                required: t("error-messages.required", { ns: "translation" }),
                pattern: {
                  value: PHONE_NUMBER_VALIDATION_PATTERN,
                  message: t("error-messages.phoneNumber", {
                    ns: "translation",
                  }),
                },
              })}
            />
            <InputField
              placeholder={t(
                "step-one-page.step-one-form.email-input.placeholder",
                { ns: "step-one-page" }
              )}
              label={t("step-one-page.step-one-form.email-input.label", {
                ns: "step-one-page",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: t("error-messages.required", { ns: "translation" }),
                pattern: {
                  value: EMAIL_VALIDATION_PATTERN,
                  message: t("error-messages.email", { ns: "translation" }),
                },
              })}
            />
            <TextareaField
              label={t("step-one-page.step-one-form.description", {
                ns: "step-one-page",
              })}
              className="border-[#efeff0]"
              placeholder={t("step-one-page.placeholder-2", {
                ns: "step-one-page",
                inputName: t("step-one-page.step-one-form.description", {
                  ns: "step-one-page",
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
                label={t("step-one-page.step-one-form.shop-type-input.label", {
                  ns: "step-one-page",
                })}
                error={!!errors.shopType}
                helperText={errors.shopType?.message}
                className="cursor-pointer"
                placeholder={t(
                  "step-one-page.step-one-form.shop-type-input.placeholder",
                  { ns: "step-one-page" }
                )}
                readOnly
                onClick={e => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
                {...register("shopType", {
                  required: t("error-messages.required", { ns: "translation" }),
                })}
              />
              <div className="absolute right-[16px] top-[42.5px]">
                <InputArrow />
              </div>
            </div>
          </form>
        </div>
        <div className="px-4 py-[10px]">
          <Button
            disabled={createFirstStep.isPending}
            onClick={handleSubmit(onSubmit)}
            type="submit"
          >
            {t("action-sheet.actions.continue", { ns: "translation" })}
          </Button>
        </div>
      </div>
      <ShopTypeModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onTypeChange={handleTypeSelect}
      />
    </>
  );
};

export default StepOneForm;
