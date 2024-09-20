import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FormWrapper,
  InputField,
  TextareaField,
  Typography,
} from "@/components";
import AddMediaBlock from "@/components/layout/add-media-block/add-media-block.tsx";
import Switch from "@/components/ui/form/switch/switch.tsx";
import { PromoBlockFormFields } from "@/components/layout/promo-block-form/types.ts";

const PromoBlockForm: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PromoBlockFormFields>();
  const { t } = useTranslation(["promo-block", "translation"]);

  return (
    <FormWrapper>
      <InputField
        label={t("promo-block-form.title", { ns: "promo-block" })}
        placeholder={t("promo-block-form.title-placeholder", {
          ns: "promo-block",
        })}
        autoComplete="off"
        {...register("title", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <TextareaField
        label={t("promo-block-form.description", { ns: "promo-block" })}
        placeholder={t("promo-block-form.description-placeholder", {
          ns: "promo-block",
        })}
        autoComplete="off"
        {...register("description", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      <InputField
        label={t("promo-block-form.promo-text", { ns: "promo-block" })}
        placeholder={t("promo-block-form.promo-text-placeholder", {
          ns: "promo-block",
        })}
        autoComplete="off"
        {...register("buttonText", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.buttonText}
        helperText={errors.buttonText?.message}
      />

      <InputField
        label={t("promo-block-form.link", { ns: "promo-block" })}
        placeholder={t("promo-block-form.link-placeholder", {
          ns: "promo-block",
        })}
        autoComplete="off"
        {...register("link", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.link}
        helperText={errors.link?.message}
      />

      <AddMediaBlock />

      <div className="flex items-center justify-between py-[9px]">
        <Typography variant="body-base" color="black_100">
          {t("promo-block-form.activate", { ns: "promo-block" })}
        </Typography>

        <Switch defaultChecked={false} {...register("isActive")} />
      </div>
    </FormWrapper>
  );
};

export default PromoBlockForm;
