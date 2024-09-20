import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, NewsLetterForm, PageContainer, PageInfo } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { NewsletterFormFields } from "@/components/layout/newsletter-form/types.ts";
import { useSubscribersMessagesAPI } from "@/hooks/api/useSubscribersMessagesAPI";
import { useMainStore } from "@/store/main-store";

const CreateNewsletterPage: FC = () => {
  const { t } = useTranslation("newsletter");
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const { createMessage, createDraftMessage } = useSubscribersMessagesAPI();
  const navigate = useNavigate();
  const methods = useForm<NewsletterFormFields>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<NewsletterFormFields> = data => {
    const image = data.image.item(0);
    const formData = new FormData();
    formData.append("message", data.name);
    formData.append("shopId", activeShopId || "");
    if (image) {
      formData.append("mediaUrl", image, encodeURIComponent(image.name));
    }
    createMessage.mutate(formData);
  };

  const messageField = methods.watch("name");

  return (
    <PageContainer className="relative h-screen overflow-y-hidden">
      <BackButton
        onClick={() => {
          if (!messageField) {
            navigate(RoutesPaths.NEWSLETTERS);
          } else {
            createDraftMessage.mutate({
              message: messageField,
              shopId: activeShopId || "",
            });
          }
        }}
      />

      <div className="flex h-full flex-col overflow-hidden">
        <PageInfo
          title={t("create-newsletter.title")}
          description={t("create-newsletter.description")}
        />

        <div className="mb-4 overflow-auto">
          <FormProvider {...methods}>
            <NewsLetterForm />
          </FormProvider>
        </div>

        <Button
          className="mt-auto"
          type="submit"
          onClick={methods.handleSubmit(onSubmit)}
          disabled={!methods.formState.isValid || createMessage.isPending}
        >
          {t("create-newsletter.button-text")}
        </Button>
      </div>
    </PageContainer>
  );
};

export default CreateNewsletterPage;
