import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BackButton } from "@twa-dev/sdk/react";
import { useTranslation } from "react-i18next";
import { PromoCodeFormFields } from "@/components/layout/promo-code-form/types.ts";
import { usePromoCodesAPI } from "@/hooks/api/usePromoCodesAPI.ts";
import { Button, PageContainer, Typography } from "@/components";
import PromoCodeForm from "@/components/layout/promo-code-form/promo-code-form.tsx";
import { PROMO_CODE_DATE_FORMAT } from "@/shared/constants.ts";
import { formatDate, parseStringToDate } from "@/utils/date-fns.ts";
import { useMainStore } from "@/store/main-store";

const PromoCodePage: FC = () => {
  const navigate = useNavigate();
  const methods = useForm<PromoCodeFormFields>();
  const params = useParams<{ promoCodeId: string }>();
  const {
    promoCodeById: { data, isSuccess },
    updatePromoCode,
    deletePromoCode,
  } = usePromoCodesAPI(params.promoCodeId);
  const { t } = useTranslation("promo-codes");
  const [activeShopId] = useMainStore(state => [state.activeShopId]);

  useEffect(() => {
    if (isSuccess) {
      methods.reset({
        code: data?.code,
        isActive: data?.isActive,
        discount: data?.discount.toString(),
        startDate: data?.startDate
          ? formatDate(data?.startDate, PROMO_CODE_DATE_FORMAT)
          : "",
        endDate: data?.startDate
          ? formatDate(data?.endDate, PROMO_CODE_DATE_FORMAT)
          : "",
      });
    }
  }, [data, methods, isSuccess]);

  const onSubmit: SubmitHandler<PromoCodeFormFields> = values => {
    updatePromoCode.mutate({
      ...values,
      id: params.promoCodeId,
      startDate: parseStringToDate(values.startDate, PROMO_CODE_DATE_FORMAT),
      endDate: parseStringToDate(values.endDate, PROMO_CODE_DATE_FORMAT),
      discount: Number(values.discount),
      shopId: activeShopId || "",
    });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)} />

      <Typography variant="heading-md" color="black_100">
        {t("promo-code-page.title")}
      </Typography>

      <FormProvider {...methods}>
        <PromoCodeForm />
      </FormProvider>

      <Button
        className="my-4"
        variant="ghost"
        onClick={() => deletePromoCode.mutate(params.promoCodeId || "")}
      >
        <Typography variant="body-base" color="red" className="font-medium">
          {t("promo-code-page.delete-button-text")}
        </Typography>
      </Button>

      <Button
        className="mb-3 mt-8"
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
        disabled={!methods.formState.isValid}
      >
        {t("promo-code-page.button-text")}
      </Button>
    </PageContainer>
  );
};

export default PromoCodePage;
