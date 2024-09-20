import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, PageContainer, Typography } from "@/components";
import { CreateProductFields } from "@/pages/product/create-product-page/types.ts";
import CreateProductForm from "@/pages/product/create-product-page/components/create-product-form.tsx";
import { useMainStore } from "@/store/main-store";
import { useProductsAPI } from "@/hooks/api/useProductsAPI";

const CreateProductPage: FC = () => {
  const navigate = useNavigate();
  const { createProduct } = useProductsAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const [isModalOpen, clearAttributes] = useMainStore(state => [
    state.isModalOpen,
    state.clearAttributes,
  ]);
  const methods = useForm<CreateProductFields>({ mode: "onBlur" });
  const { t } = useTranslation("products-pages");

  const onSubmit: SubmitHandler<CreateProductFields> = data => {
    const { images } = data;
    const formData = new FormData();
    formData.append("shopId", activeShopId || "");
    formData.append("name", data.name);
    formData.append("descriptionFull", data.descriptionFull);
    formData.append("descriptionShort", data.descriptionShort);
    formData.append("isFeatured", JSON.stringify(data.featured));
    formData.append("cost", JSON.stringify(100));
    formData.append("stock", JSON.stringify(100));
    formData.append("discount", JSON.stringify(100));
    formData.append("currency", "USD");
    formData.append("categoryTypeId", data.category);
    formData.append("featuredText", data.featuredText || "");
    formData.append(
      "prices",
      JSON.stringify([{ price: data.price, currency: "USD" }])
    );
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append("mediasUrl", image, encodeURIComponent(image.name));
      });
    }

    createProduct.mutate(formData);
  };

  return (
    <PageContainer>
      <BackButton
        onClick={() => {
          if (!isModalOpen) {
            navigate(-1);
            clearAttributes();
          }
        }}
      />

      <Typography variant="heading-md" color="black_100">
        {t("create-product-page.title")}
      </Typography>

      <FormProvider {...methods}>
        <CreateProductForm />
      </FormProvider>

      <Button
        disabled={createProduct.isPending}
        className="mb-3 mt-8"
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
      >
        {t("create-product-page.add-button-text")}
      </Button>
    </PageContainer>
  );
};

export default CreateProductPage;
