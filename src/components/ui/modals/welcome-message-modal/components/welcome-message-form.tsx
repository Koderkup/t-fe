import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "@/components/ui/form/input-field/input-field";
import MediaBlock from "./media-block";
import { WelcomeMessageFields } from "../types";
import { useMainStore } from "@/store/main-store";

const WelcomeMessageForm: FC = () => {
  const { t } = useTranslation(["bot-settings-page", "translation"]);
  const [isModalOpen] = useMainStore(state => [state.isModalOpen]);

  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext<WelcomeMessageFields>();

  useEffect(() => {
    if (!isModalOpen) clearErrors("text");
  }, [clearErrors, isModalOpen]);

  return (
    <form className="flex flex-col gap-y-2">
      <MediaBlock />
      <InputField
        label={t("welcome-message-modal.form.text-input.label", {
          ns: "bot-settings-page",
        })}
        className="rounded-[12px] border-black_10 py-3"
        placeholder={t("welcome-message-modal.form.text-input.placeholder", {
          ns: "bot-settings-page",
        })}
        {...register("text", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        helperText={errors.text?.message}
        error={!!errors.text}
      />
    </form>
  );
};

export default WelcomeMessageForm;
