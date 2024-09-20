import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, PageContainer, Typography } from "@/components";
import PromoBlockForm from "@/components/layout/promo-block-form/promo-block-form.tsx";
import { PromoBlockFormFields } from "@/components/layout/promo-block-form/types.ts";
import { usePromoBlockAPI } from "@/hooks/api/usePromoBlockAPI.ts";
import { useMainStore } from "@/store/main-store";

const CreatePromoBlockPage: FC = () => {
  const navigate = useNavigate();
  const methods = useForm<PromoBlockFormFields>({ mode: "onBlur" });
  const { createPromoBlock } = usePromoBlockAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const { t } = useTranslation("promo-block");

  const onSubmit: SubmitHandler<PromoBlockFormFields> = data => {
    const image = data.image.item(0);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("buttonText", data.buttonText);
    formData.append("isActive", JSON.stringify(data.isActive));
    formData.append("link", data.link);
    formData.append("shopId", activeShopId || "");

    if (image) {
      formData.append("mediaUrl", image, encodeURIComponent(image.name));
    }

    createPromoBlock.mutate(formData);
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)} />

      <Typography variant="heading-md" color="black_100">
        {t("create-promo-block-page.title")}
      </Typography>

      <FormProvider {...methods}>
        <PromoBlockForm />
      </FormProvider>

      <Button
        className="mb-3 mt-8"
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
        disabled={!methods.formState.isValid || createPromoBlock.isPending}
      >
        {t("create-promo-block-page.button-text")}
      </Button>
    </PageContainer>
  );
};

export default CreatePromoBlockPage;
