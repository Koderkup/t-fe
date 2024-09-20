import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  InputField,
  ModalPageRoot,
  PageContainer,
  Typography,
} from "@/components";
import { useMainStore } from "@/store/main-store";
import { useAppConfigurationAPI } from "@/hooks/api/useAppConfigurationAPI";

type Props = {
  showModal: boolean;
  onClose: () => void;
  welcome: string;
};

const OrderConfirmationModal: FC<Props> = ({ showModal, onClose, welcome }) => {
  const { t } = useTranslation(["bot-settings-page", "translation"]);
  const { updateAppConfiguration } = useAppConfigurationAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const [isModalOpen] = useMainStore(state => [state.isModalOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<{ text: string }>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<{ text: string }> = data => {
    updateAppConfiguration.mutate({
      data: {
        botMessages: {
          confirmOrder: data.text,
          welcome,
        },
      },
      shopId: activeShopId || "",
    });
    reset();
  };

  const fieldText = watch("text") || "";

  useEffect(() => {
    if (isModalOpen) clearErrors("text");
  }, [clearErrors, isModalOpen]);

  return (
    <ModalPageRoot showModal={showModal} onClose={onClose}>
      <PageContainer className="flex h-screen flex-col justify-between">
        <div className="flex flex-col gap-y-4">
          <Typography
            tag="h1"
            variant="heading-lg"
            color="black_100"
            className="tracking-[-0.02em]"
          >
            {t("order-confirmation-modal", { ns: "bot-settings-page" })}
          </Typography>
          <form>
            <InputField
              label={t("welcome-message-modal.form.text-input.label", {
                ns: "bot-settings-page",
              })}
              className="rounded-[12px] border-black_10 py-3"
              placeholder={t(
                "welcome-message-modal.form.text-input.placeholder",
                { ns: "bot-settings-page" }
              )}
              {...register("text", {
                required: t("error-messages.required", { ns: "translation" }),
              })}
              error={!!errors.text}
              helperText={errors.text?.message}
            />
          </form>
        </div>
        <div className="py-2.5">
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={fieldText.length === 0}
            className="py-3"
          >
            {t("button-text")}
          </Button>
        </div>
      </PageContainer>
    </ModalPageRoot>
  );
};

export default OrderConfirmationModal;
