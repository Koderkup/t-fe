import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddMediaBlock, FormWrapper } from "@/components";
import { NewsletterFormFields } from "@/components/layout/newsletter-form/types.ts";
import TextareaField from "../../ui/form/textarea-field/textarea-field.tsx";

type Props = {
  type?: "create" | "sent" | "pending";
  showMediaBlock?: boolean;
};

const NewsletterForm: FC<Props> = ({
  type = "create",
  showMediaBlock = true,
}) => {
  const { t } = useTranslation(["newsletter", "translation"]);
  const {
    register,
    formState: { errors },
  } = useFormContext<NewsletterFormFields>();

  return (
    <FormWrapper>
      {showMediaBlock && (
        <AddMediaBlock
          label={t("create-newsletter.media-label", { ns: "newsletter" })}
          buttonText={t("create-newsletter.media-placeholder", {
            ns: "newsletter",
          })}
        />
      )}

      <TextareaField
        label={t("create-newsletter.message", { ns: "newsletter" })}
        placeholder={t("create-newsletter.message-placeholder", {
          ns: "newsletter",
        })}
        autoComplete="off"
        disabled={type === "sent"}
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register("name", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
      />
    </FormWrapper>
  );
};

export default NewsletterForm;
