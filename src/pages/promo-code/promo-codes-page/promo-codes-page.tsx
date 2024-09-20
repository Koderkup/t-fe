import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@twa-dev/sdk/react";
import { useTranslation } from "react-i18next";
import { Button, PageContainer, Typography } from "@/components";
import { RoutesPaths } from "@/routes/paths.config.ts";
import AddIcon from "../../../../public/icons/add-fill.svg";
import { usePromoCodesAPI } from "@/hooks/api/usePromoCodesAPI.ts";
import PromoCodeList from "@/pages/promo-code/promo-codes-page/components/promo-code-list.tsx";
import { useMainStore } from "@/store/main-store";

const PromoCodesPage: FC = () => {
  const navigate = useNavigate();
  const { promoCodes } = usePromoCodesAPI();
  const { t } = useTranslation("promo-codes");
  const [activeShopId] = useMainStore(state => [state.activeShopId]);

  return (
    <PageContainer className="relative h-screen overflow-y-hidden">
      <BackButton
        onClick={() => navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`)}
      />

      <div className="flex h-full flex-col overflow-y-hidden">
        <Typography variant="heading-md" color="black_100">
          {t("promo-codes-page.title")}
        </Typography>

        <Button
          className="mt-6"
          icon={
            <span className="h-6 w-6 fill-black_20">
              <AddIcon />
            </span>
          }
          variant="outline"
          onClick={() => navigate(RoutesPaths.CREATE_PROMO_CODE)}
        >
          {t("promo-codes-page.button-text")}
        </Button>

        {promoCodes?.data && promoCodes?.data.length > 0 && (
          <div className="mt-4 flex h-auto flex-col gap-4 overflow-auto">
            <PromoCodeList data={promoCodes.data} />
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default PromoCodesPage;
