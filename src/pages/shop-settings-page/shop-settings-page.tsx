import { FC, useEffect, useMemo } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { Button, PageContainer, Typography } from "@/components";
import ShopSettingsForm from "./components/shop-settings-form";
import { ShopSettingsFileds } from "@/shared/types/shop.interface";
import { useMainStore } from "@/store/main-store";
import { useShopsAPI } from "@/hooks/api/useShopsAPI";
import useCountriesList from "@/hooks/useCountriesList";

const ShopSettingsPage: FC = () => {
  const { t, i18n } = useTranslation("shop-settings-page");
  const [activeShopId, setActiveMedia, activeMedia] = useMainStore(state => [
    state.activeShopId,
    state.setActiveMedia,
    state.activeMedia,
  ]);
  const [isModalOpen] = useMainStore(state => [state.isModalOpen]);
  const {
    shop: { data, isSuccess },
    updateShop,
  } = useShopsAPI(activeShopId || "");

  const navigate = useNavigate();

  const methods = useForm<ShopSettingsFileds>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ShopSettingsFileds> = values => {
    const mediaFile = values.image?.item(0);
    const formData = new FormData();
    formData.append("name", values.shopName);
    formData.append("description", values.description);
    if (mediaFile) {
      formData.append(
        "mediaUrl",
        mediaFile,
        encodeURIComponent(mediaFile.name)
      );
    }

    if (activeMedia && activeMedia?.length > 0 && !mediaFile) {
      formData.append("mediaUrl", activeMedia);
    }

    if (!activeMedia) {
      formData.append("mediaUrl", JSON.stringify(null));
    }

    const configuration = {
      country: values.countryValue || "",
      shopCurrencies: values.currency || [],
      botToken: values.botToken,
    };

    updateShop.mutate({
      productId: data?.id || "",
      data: formData,
      configuration,
    });
  };

  const { countryArr } = useCountriesList(i18n.language);
  const selectedCountry = useMemo(
    () =>
      countryArr
        .flatMap(el => el.options)
        .find(country => country.value === data?.configuration.country),
    [countryArr, data?.configuration.country]
  );

  useEffect(() => {
    if (isSuccess) {
      methods.reset({
        shopName: data?.name,
        botToken: data?.configuration.botToken,
        description: data?.description,
        currency: data?.configuration.shopCurrencies,
        country: selectedCountry?.label,
        countryValue: selectedCountry?.value,
      });

      setActiveMedia(data.mediaUrl);
    }
  }, [isSuccess]);

  return (
    <PageContainer className="flex h-screen flex-col justify-between">
      <BackButton
        onClick={() => {
          if (!isModalOpen) {
            navigate(-1);
            setActiveMedia(null);
          }
        }}
      />
      <div>
        <Typography
          variant="heading-lg"
          color="black_100"
          className="tracking-[-0.02em]"
        >
          {t("page-title")}
        </Typography>
        <FormProvider {...methods}>
          <ShopSettingsForm
            currency={data?.configuration.shopCurrencies || []}
            country={data?.configuration.country || ""}
          />
        </FormProvider>
      </div>
      <div className="py-2.5">
        <Button
          onClick={methods.handleSubmit(onSubmit)}
          disabled={updateShop.isPending}
          className="py-3"
        >
          {t("button-text")}
        </Button>
      </div>
    </PageContainer>
  );
};

export default ShopSettingsPage;
