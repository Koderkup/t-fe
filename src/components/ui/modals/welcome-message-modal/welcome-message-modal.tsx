import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, ModalPageRoot, PageContainer, Typography } from "@/components";
import { WelcomeMessageFields } from "./types";
import WelcomeMessageForm from "./components/welcome-message-form";
import { useAppConfigurationAPI } from "@/hooks/api/useAppConfigurationAPI";
import { useMainStore } from "@/store/main-store";

type Props = {
  showModal: boolean;
  onClose: () => void;
  confirmOrder: string;
};

const WelcomeMessageModal: FC<Props> = ({
  showModal,
  onClose,
  confirmOrder,
}) => {
  const { t } = useTranslation("bot-settings-page");
  const { updateAppConfiguration } = useAppConfigurationAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const methods = useForm<WelcomeMessageFields>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<WelcomeMessageFields> = data => {
    const dataForm = {
      welcome: data.text,
      confirmOrder,
    };
    const image = data.image.item(0);
    const formData = new FormData();
    formData.append("botMessages", JSON.stringify(dataForm));
    if (image) {
      formData.append("mediaUrl", image, encodeURIComponent(image.name));
    }

    updateAppConfiguration.mutate({
      data: formData,
      shopId: activeShopId || "",
    });
  };

  useEffect(() => {
    if (updateAppConfiguration.isSuccess) {
      methods.reset();
    }
  }, [methods, updateAppConfiguration.isSuccess]);

  const welcomeMessage = methods.watch("text") || "";

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
            {t("welcome-message-modal.title")}
          </Typography>
          <FormProvider {...methods}>
            <WelcomeMessageForm />
          </FormProvider>
        </div>
        <div className="py-2.5">
          <Button
            onClick={methods.handleSubmit(onSubmit)}
            disabled={
              welcomeMessage.length === 0 || updateAppConfiguration.isPending
            }
            className="py-3"
          >
            {t("button-text")}
          </Button>
        </div>
      </PageContainer>
    </ModalPageRoot>
  );
};

export default WelcomeMessageModal;
