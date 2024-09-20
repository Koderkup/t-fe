import { FC, useEffect } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { Button, PageContainer, Typography } from "@/components";
import { CreateProductFields } from "@/pages/product/create-product-page/types.ts";
import CreateProductForm from "@/pages/product/create-product-page/components/create-product-form.tsx";
import { useMainStore } from "@/store/main-store";
import { useProductsAPI } from "@/hooks/api/useProductsAPI";
import { Option } from "@/shared/types/product.interface";

const ProductPage: FC = () => {
  const { t } = useTranslation("products-pages");
  const navigate = useNavigate();
  const params = useParams<{ productId: string }>();
  const { product, updateCreatedProduct } = useProductsAPI(params.productId);
  const [setAttributes, clearAttributes, setProductMedias, productMedias] =
    useMainStore(state => [
      state.setAttributes,
      state.clearAttributes,
      state.setProductMedias,
      state.productMedias,
    ]);
  const [isModalOpen] = useMainStore(state => [state.isModalOpen]);

  const methods = useForm<CreateProductFields>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<CreateProductFields> = data => {
    const { images } = data;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("descriptionFull", data.descriptionFull);
    formData.append("descriptionShort", data.descriptionShort);
    formData.append("isFeatured", JSON.stringify(data.featured));
    formData.append("cost", JSON.stringify(100));
    formData.append("stock", JSON.stringify(100));
    formData.append("discount", JSON.stringify(0));
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

    if (productMedias && productMedias.length > 0) {
      formData.append("mediasUrl", JSON.stringify(productMedias));
    }

    updateCreatedProduct.mutate({
      productId: params.productId || "",
      data: formData,
    });
  };

  useEffect(() => {
    if (product.isSuccess) {
      const productPrice =
        typeof product.data.prices === "string"
          ? JSON.parse(product.data.prices)[0]
          : product.data.prices[0];

      methods.reset({
        name: product.data.name,
        descriptionFull: product.data.descriptionFull,
        descriptionShort: product.data.descriptionShort,
        category: product.data.categoryType ? product.data.categoryType.id : "",
        featured: product.data.isFeatured,
        price: productPrice.price,
        featuredText: product.data.featuredText,
      });

      if (product.data.colors.length) {
        setAttributes({
          id: "1",
          attributeName: "Color",
          options: product.data.colors as Option[],
        });
      }

      if (product.data.sizes.length) {
        setAttributes({
          id: "2",
          attributeName: "Size",
          options: product.data.sizes as Option[],
        });
      }

      if (product.data.mediasUrl) {
        setProductMedias(product.data.mediasUrl);
      }
    }

    return () => {
      clearAttributes();
      setProductMedias([]);
    };
  }, [
    methods,
    product.data,
    product.isSuccess,
    setAttributes,
    clearAttributes,
    setProductMedias,
  ]);

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
        {t("product-page")}
      </Typography>

      <FormProvider {...methods}>
        <CreateProductForm />
      </FormProvider>

      <Button
        disabled={updateCreatedProduct.isPending}
        className="mb-3 mt-8"
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
      >
        {t("product-page")}
      </Button>
    </PageContainer>
  );
};

export default ProductPage;
