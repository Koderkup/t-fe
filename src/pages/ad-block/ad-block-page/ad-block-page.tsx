import { FC, useEffect } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AdBlockForm, Button, PageContainer, Typography } from "@/components";
import { AdBlockFormFields } from "@/components/layout/ad-block-form/types.ts";
import { useAdBlockAPI } from "@/hooks/api/useAdBlockAPI.ts";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { useMainStore } from "@/store/main-store";

const AdBlockPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ adBlockId: string }>();
  const { adBlockById, updateAdBlock, deleteAdBlock } = useAdBlockAPI(
    params.adBlockId
  );
  const methods = useForm<AdBlockFormFields>();
  const [setActiveMedia, activeMedia] = useMainStore(state => [
    state.setActiveMedia,
    state.activeMedia,
  ]);
  const { t } = useTranslation("ad-block-page");

  useEffect(() => {
    if (adBlockById.isSuccess) {
      methods.reset({
        promoTitle: adBlockById?.data?.promoTitle,
        promoLink: adBlockById?.data?.promoLink,
        promoURL: adBlockById?.data?.promoURL,
        title: adBlockById?.data?.title,
        description: adBlockById?.data?.description,
        buttonText: adBlockById?.data?.buttonText,
        buttonLink: adBlockById?.data?.buttonLink,
        isActive: adBlockById?.data?.isActive,
      });

      setActiveMedia(adBlockById.data.mediaUrl);
    }

    if (updateAdBlock.isSuccess) {
      setActiveMedia(null);
      navigate(RoutesPaths.AD_BLOCK);
    }
  }, [adBlockById.isSuccess, updateAdBlock.isSuccess]);

  const onSubmit: SubmitHandler<AdBlockFormFields> = values => {
    const image = values.image?.item(0);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("promoLink", values.promoLink);
    formData.append("promoURL", values.promoURL);
    formData.append("promoTitle", values.promoTitle);
    formData.append("description", values.description);
    formData.append("buttonText", values.buttonText);
    formData.append("buttonLink", values.buttonLink);
    formData.append("isActive", JSON.stringify(values.isActive));
    if (image) {
      formData.append("mediaUrl", image, encodeURIComponent(image.name));
    }

    if (activeMedia && activeMedia?.length > 0 && !image) {
      formData.append("mediaUrl", activeMedia);
    }

    if (!activeMedia) {
      formData.append("mediaUrl", JSON.stringify(null));
    }

    updateAdBlock.mutate({
      id: params.adBlockId || "",
      data: formData,
    });
  };

  return (
    <PageContainer>
      <BackButton
        onClick={() => {
          setActiveMedia(null);
          navigate(-1);
        }}
      />

      <Typography variant="heading-md" color="black_100">
        {t("ad-block-page.title")}
      </Typography>

      <FormProvider {...methods}>
        <AdBlockForm />
      </FormProvider>

      <Button
        className="my-4"
        variant="ghost"
        onClick={() => deleteAdBlock.mutate(params.adBlockId || "")}
      >
        <Typography variant="body-base" color="red" className="font-medium">
          {t("ad-block-page.delete-button-text")}
        </Typography>
      </Button>

      <Button
        className="mb-3 mt-8"
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
        disabled={!methods.formState.isValid || updateAdBlock.isPending}
      >
        {t("ad-block-page.button-text")}
      </Button>
    </PageContainer>
  );
};

export default AdBlockPage;
