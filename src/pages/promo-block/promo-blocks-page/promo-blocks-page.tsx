import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { Button, PageContainer, Typography } from "@/components";
import AddIcon from "../../../../public/icons/add-fill.svg";
import { usePromoBlockAPI } from "@/hooks/api/usePromoBlockAPI.ts";
import PromoBlockList from "@/pages/promo-block/promo-blocks-page/components/promo-block-list.tsx";
import { useMainStore } from "@/store/main-store";

const PromoBlocksPage: FC = () => {
  const navigate = useNavigate();
  const { promoBlocks } = usePromoBlockAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const { t } = useTranslation("promo-block");

  return (
    <PageContainer className="relative h-screen overflow-y-hidden">
      <BackButton
        onClick={() => navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`)}
      />

      <div className="flex h-full flex-col overflow-y-hidden">
        <Typography variant="heading-md" color="black_100">
          {t("promo-blocks-page.title")}
        </Typography>

        <Button
          className="mt-6"
          icon={
            <span className="h-6 w-6 fill-black_20">
              <AddIcon />
            </span>
          }
          variant="outline"
          onClick={() => navigate(RoutesPaths.CREATE_PROMO_BLOCK)}
        >
          {t("promo-blocks-page.button-text")}
        </Button>

        {promoBlocks?.data && promoBlocks?.data.length > 0 && (
          <div className="mt-4 flex h-auto flex-col gap-4 overflow-auto">
            <PromoBlockList data={promoBlocks.data} />
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default PromoBlocksPage;
