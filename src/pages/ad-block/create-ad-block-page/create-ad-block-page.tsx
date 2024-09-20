import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AdBlockForm, Button, PageContainer, Typography } from "@/components";
import { useAdBlockAPI } from "@/hooks/api/useAdBlockAPI.ts";
import { AdBlockFormFields } from "@/components/layout/ad-block-form/types.ts";
import { useMainStore } from "@/store/main-store";

const CreateAdBlockPage: FC = () => {
  const navigate = useNavigate();
  const methods = useForm<AdBlockFormFields>({ mode: "onBlur" });
  const { createAdBlock } = useAdBlockAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const { t } = useTranslation("ad-block-page");

  const onSubmit: SubmitHandler<AdBlockFormFields> = data => {
    const image = data.image.item(0);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("promoLink", data.promoLink);
    formData.append("promoURL", data.promoURL);
    formData.append("promoTitle", data.promoTitle);
    formData.append("description", data.description);
    formData.append("buttonText", data.buttonText);
    formData.append("buttonLink", data.buttonLink);
    formData.append("isActive", JSON.stringify(data.isActive));
    formData.append("shopId", activeShopId || "");
    if (image) {
      formData.append("mediaUrl", image, encodeURIComponent(image.name));
    }

    createAdBlock.mutate(formData);
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)} />

      <Typography variant="heading-md" color="black_100">
        {t("create-ad-block-page.title")}
      </Typography>

      <FormProvider {...methods}>
        <AdBlockForm />
      </FormProvider>

      <Button
        className="mb-3 mt-8"
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
        disabled={!methods.formState.isValid || createAdBlock.isPending}
      >
        {t("create-ad-block-page.button-text")}
      </Button>
    </PageContainer>
  );
};

export default CreateAdBlockPage;
