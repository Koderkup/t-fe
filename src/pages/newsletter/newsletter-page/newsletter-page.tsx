import { FC, useEffect } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, NewsLetterForm, PageContainer, PageInfo } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { NewsletterFormFields } from "@/components/layout/newsletter-form/types.ts";
import { useSubscribersMessagesAPI } from "@/hooks/api/useSubscribersMessagesAPI";

const NewsletterPage: FC = () => {
  const { t } = useTranslation("newsletter");
  const params = useParams<{ newsletterId: string }>();
  const {
    message: { data, isSuccess },
    updateMessage,
    updateDraftMessage,
    sendMessage,
  } = useSubscribersMessagesAPI(params.newsletterId);
  const navigate = useNavigate();

  const methods = useForm<NewsletterFormFields>();

  const { name, image } = methods.formState.dirtyFields;

  const onSubmit: SubmitHandler<NewsletterFormFields> = values => {
    const mediaFile = values.image.item(0);
    const formData = new FormData();
    formData.append("message", values.name);
    if (mediaFile) {
      formData.append(
        "mediaUrl",
        mediaFile,
        encodeURIComponent(mediaFile.name)
      );
    }

    if (name || image) {
      updateMessage.mutate({
        id: data?.id || "",
        data: formData,
      });
    } else {
      sendMessage.mutate(data?.id || "");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      methods.reset({
        name: data.message,
      });
    }
  }, [data?.message, isSuccess, methods]);

  return (
    <PageContainer className="relative h-screen overflow-y-hidden">
      <BackButton
        onClick={() => {
          if (name || image) {
            updateDraftMessage.mutate({
              id: data?.id || "",
              data: {
                message: methods.watch("name"),
              },
            });
          } else {
            navigate(RoutesPaths.NEWSLETTERS);
          }
        }}
      />
      <div className="flex h-full flex-col overflow-y-hidden">
        <PageInfo
          title={
            data?.status === "Sent"
              ? t("newsletter-history.modal-text")
              : t("newsletter-history.status.pending")
          }
        />

        <FormProvider {...methods}>
          <NewsLetterForm
            type={data?.status.toLowerCase() as "sent" | "pending"}
            showMediaBlock={data?.status === "Pending"}
          />
        </FormProvider>
        {data?.status === "Pending" && (
          <Button
            className="mt-auto"
            type="submit"
            onClick={methods.handleSubmit(onSubmit)}
            disabled={!methods.formState.isValid || updateMessage.isPending}
          >
            {t("create-newsletter.button-text-2")}
          </Button>
        )}
      </div>
    </PageContainer>
  );
};

export default NewsletterPage;
