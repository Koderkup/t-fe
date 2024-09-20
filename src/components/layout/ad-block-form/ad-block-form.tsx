import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AddMediaBlock,
  FormWrapper,
  InputField,
  TextareaField,
  Typography,
} from "@/components";
import { AdBlockFormFields } from "@/components/layout/ad-block-form/types.ts";
import Switch from "@/components/ui/form/switch/switch.tsx";

const AdBlockForm: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AdBlockFormFields>();
  const { t } = useTranslation(["ad-block-page", "translation"]);

  return (
    <FormWrapper>
      <InputField
        label={t("ad-block-form.promo-title", { ns: "ad-block-page" })}
        placeholder={t("ad-block-form.promo-title-placeholder", {
          ns: "ad-block-page",
        })}
        autoComplete="off"
        {...register("promoTitle", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.promoTitle}
        helperText={errors.promoTitle?.message}
      />

      <InputField
        label={t("ad-block-form.promo-link", { ns: "ad-block-page" })}
        placeholder={t("ad-block-form.promo-link-placeholder", {
          ns: "ad-block-page",
        })}
        autoComplete="off"
        {...register("promoLink", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.promoLink}
        helperText={errors.promoLink?.message}
      />

      <InputField
        label={t("ad-block-form.promo-url", { ns: "ad-block-page" })}
        placeholder={t("ad-block-form.promo-url-placeholder", {
          ns: "ad-block-page",
        })}
        autoComplete="off"
        {...register("promoURL", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.promoURL}
        helperText={errors.promoURL?.message}
      />

      <AddMediaBlock />

      <InputField
        label={t("ad-block-form.title", { ns: "ad-block-page" })}
        placeholder={t("ad-block-form.title-placeholder", {
          ns: "ad-block-page",
        })}
        autoComplete="off"
        {...register("title", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextareaField
        label={t("ad-block-form.description", { ns: "ad-block-page" })}
        placeholder={t("ad-block-form.description-placeholder", {
          ns: "ad-block-page",
        })}
        autoComplete="off"
        {...register("description", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <InputField
        label={t("ad-block-form.button-text", { ns: "ad-block-page" })}
        placeholder={t("ad-block-form.button-text-placeholder", {
          ns: "ad-block-page",
        })}
        autoComplete="off"
        {...register("buttonText", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.buttonText}
        helperText={errors.buttonText?.message}
      />

      <InputField
        label={t("ad-block-form.button-url", { ns: "ad-block-page" })}
        placeholder={t("ad-block-form.button-url-placeholder", {
          ns: "ad-block-page",
        })}
        autoComplete="off"
        {...register("buttonLink", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.buttonLink}
        helperText={errors.buttonLink?.message}
      />

      <div className="flex items-center justify-between py-[9px]">
        <Typography variant="body-base" color="black_100">
          {t("ad-block-form.activate", { ns: "ad-block-page" })}
        </Typography>

        <Switch defaultChecked={false} {...register("isActive")} />
      </div>
    </FormWrapper>
  );
};

export default AdBlockForm;
