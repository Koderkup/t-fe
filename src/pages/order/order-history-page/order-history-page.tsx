import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import OrdersList from "./components/orders-list";
import { Typography } from "@/components";
import { RoutesPaths } from "@/routes/paths.config";
import { useOrdersAPI } from "@/hooks/api/useOrdersAPI";
import { useMainStore } from "@/store/main-store";

const OrderHistoryPage: FC = () => {
  const { t } = useTranslation("orders-pages");
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const navigate = useNavigate();
  const {
    orders: { data },
  } = useOrdersAPI();

  return (
    <div>
      <BackButton
        onClick={() => navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`)}
      />
      <div className="px-4 pt-2">
        <Typography
          tag="h1"
          variant="heading-lg"
          color="black_100"
          className="tracking-[-0.02em]"
        >
          {t("order-history-page.title")}
        </Typography>
        {data && data.length > 0 ? (
          <OrdersList orders={data} />
        ) : (
          <div className="fixed top-[50%] flex w-full justify-center">
            <Typography
              tag="h1"
              variant="heading-lg"
              color="black_100"
              className="tracking-[-0.02em]"
            >
              {t("data-placeholder")}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
