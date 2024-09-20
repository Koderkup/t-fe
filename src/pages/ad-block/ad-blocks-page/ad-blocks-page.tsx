import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddIcon from "public/icons/add-fill.svg";
import { Button, PageContainer, Typography } from "@/components";
import { useAdBlockAPI } from "@/hooks/api/useAdBlockAPI.ts";
import AdBlockList from "./components/ad-block-list.tsx";
import { RoutesPaths } from "@/routes/paths.config.ts";
import { useMainStore } from "@/store/main-store.ts";

const AdBlockPage: FC = () => {
  const navigate = useNavigate();
  const { adBlocks } = useAdBlockAPI();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const { t } = useTranslation("ad-block-page");

  return (
    <PageContainer className="relative h-screen overflow-hidden">
      <BackButton
        onClick={() => navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`)}
      />

      <div className="flex h-full flex-col overflow-y-hidden">
        <Typography variant="heading-md" color="black_100">
          {t("ad-blocks-page.title")}
        </Typography>

        <Button
          className="mt-6"
          icon={
            <span className="h-6 w-6 fill-black_20">
              <AddIcon />
            </span>
          }
          variant="outline"
          onClick={() => navigate(RoutesPaths.CREATE_AD_BLOCK)}
        >
          {t("ad-blocks-page.button-text")}
        </Button>

        {adBlocks?.data && adBlocks.data.length > 0 && (
          <div className="mt-4 flex max-h-full flex-col gap-4 overflow-auto">
            <AdBlockList data={adBlocks.data} />
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default AdBlockPage;
