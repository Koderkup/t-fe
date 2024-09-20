import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { BackButton } from "@twa-dev/sdk/react";
import { useTranslation } from "react-i18next";
import { Button, PageContainer, Typography } from "@/components";
import { usePromoCodesAPI } from "@/hooks/api/usePromoCodesAPI.ts";
import { PromoCodeFormFields } from "@/components/layout/promo-code-form/types.ts";
import PromoCodeForm from "@/components/layout/promo-code-form/promo-code-form.tsx";
import { parseStringToDate } from "@/utils/date-fns.ts";
import { PROMO_CODE_DATE_FORMAT } from "@/shared/constants.ts";
import { useMainStore } from "@/store/main-store";

const CreatePromoCodePage: FC = () => {
  const navigate = useNavigate();
  const methods = useForm<PromoCodeFormFields>({ mode: "onBlur" });
  const { createPromoCode } = usePromoCodesAPI();
  const { t } = useTranslation("promo-codes");
  const [activeShopId] = useMainStore(state => [state.activeShopId]);

  const onSubmit: SubmitHandler<PromoCodeFormFields> = data => {
    createPromoCode.mutate({
      ...data,
      startDate: parseStringToDate(data.startDate, PROMO_CODE_DATE_FORMAT),
      endDate: parseStringToDate(data.endDate, PROMO_CODE_DATE_FORMAT),
      discount: Number(data.discount),
      shopId: activeShopId || "",
    });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)} />

      <Typography variant="heading-md" color="black_100">
        {t("create-promo-code-page.title")}
      </Typography>

      <FormProvider {...methods}>
        <PromoCodeForm />
      </FormProvider>

      <Button
        className="mb-3 mt-8"
        type="submit"
        onClick={methods.handleSubmit(onSubmit)}
        disabled={!methods.formState.isValid}
      >
        {t("create-promo-code-page.button-text")}
      </Button>
    </PageContainer>
  );
};

export default CreatePromoCodePage;
