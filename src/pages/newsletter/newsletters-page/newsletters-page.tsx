import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "@/routes/paths.config.ts";
import NewslettersList from "@/pages/newsletter/newsletters-page/components/newsletters-list.tsx";
import { useSubscribersMessagesAPI } from "@/hooks/api/useSubscribersMessagesAPI";
import NoNewslettersPlaceholder from "./components/no-newsletters-placeholder";
import { useMainStore } from "@/store/main-store";

const NewslettersPage: FC = () => {
  const [isModalOpen] = useMainStore(state => [state.isModalOpen]);
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const {
    messages: { data },
  } = useSubscribersMessagesAPI();
  const navigate = useNavigate();

  return (
    <>
      <BackButton
        onClick={() => {
          if (!isModalOpen)
            navigate(`${RoutesPaths.ADMINISTRATE}/${activeShopId}`);
        }}
      />
      {data?.length ? (
        <NewslettersList messages={data} />
      ) : (
        <NoNewslettersPlaceholder />
      )}
    </>
  );
};

export default NewslettersPage;
