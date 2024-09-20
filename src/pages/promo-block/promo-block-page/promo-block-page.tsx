import { FC, useEffect } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, PageContainer, Typography } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { usePromoBlockAPI } from "@/hooks/api/usePromoBlockAPI.ts";
import { PromoBlockFormFields } from "@/components/layout/promo-block-form/types.ts";
import PromoBlockForm from "@/components/layout/promo-block-form/promo-block-form.tsx";
import { useMainStore } from "@/store/main-store";

const PromoBlockPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ promoBlockId: string }>();
  const { promoBlockById, updatePromoBlock, deletePromoBlock } =
    usePromoBlockAPI(params.promoBlockId);
  const [setActiveMedia, activeMedia] = useMainStore(state => [
    state.setActiveMedia,
    state.activeMedia,
  ]);

  const methods = useForm<PromoBlockFormFields>();
  const { t } = useTranslation("promo-block");

  useEffect(() => {
    if (promoBlockById.isSuccess) {
      methods.reset({
        link: promoBlockById?.data?.link,
        title: promoBlockById?.data?.title,
        description: promoBlockById?.data?.description,
        buttonText: promoBlockById?.data?.buttonText,
        isActive: promoBlockById?.data?.isActive,
      });

      setActiveMedia(promoBlockById.data.mediaUrl);
    }

    if (updatePromoBlock.isSuccess) {
      setActiveMedia(null);
      navigate(RoutesPaths.PROMO_BLOCK);
    }
  }, [promoBlockById.isSuccess, updatePromoBlock.isSuccess]);

  const onSubmit: SubmitHandler<PromoBlockFormFields> = values => {
    const image = values.image?.item(0);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("buttonText", values.buttonText);
    formData.append("isActive", JSON.stringify(values.isActive));
    formData.append("link", values.link);
    if (image) {
      formData.append("mediaUrl", image, encodeURIComponent(image.name));
    }

    if (activeMedia && activeMedia?.length > 0 && !image) {
      formData.append("mediaUrl", activeMedia);
    }

    if (!activeMedia) {
      formData.append("mediaUrl", JSON.stringify(null));
    }

    updatePromoBlock.mutate({
      id: params.promoBlockId || "",
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
        {t("promo-block-page.title")}
      </Typography>

      <FormProvider {...methods}>
        <PromoBlockForm />
      </FormProvider>

      <Button
        className="my-4"
        variant="ghost"
        onClick={() => deletePromoBlock.mutate(params.promoBlockId || "")}
      >
        <Typography variant="body-base" color="red" className="font-medium">
          {t("promo-block-page.delete-button-text")}
        </Typography>
      </Button>

      <Button
        className="mb-3 mt-8"
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
        disabled={!methods.formState.isValid || updatePromoBlock.isPending}
      >
        {t("promo-block-page.button-text")}
      </Button>
    </PageContainer>
  );
};

export default PromoBlockPage;
