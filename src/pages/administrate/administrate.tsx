import { FC, useMemo } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ControlPanel } from "@/components";
import AdministrateTitle from "./components/administrate-title";
import StoreList from "./components/store-list";
import { RoutesPaths } from "@/routes/paths.config";
import { useTelegram } from "@/hooks/useTelegram";
import { useUserAPI } from "@/hooks/api/useUserAPI";
import { useShopsAPI } from "@/hooks/api/useShopsAPI";

const Administrate: FC = () => {
  const { t } = useTranslation("translation");
  const { user } = useTelegram();
  const {
    getUserByTelegramId: { data },
  } = useUserAPI(user?.id);
  const { shops } = useShopsAPI("", data?.id);
  const navigate = useNavigate();

  const activeShops = useMemo(
    () => shops.data?.filter(el => !el.inDraft),
    [shops.data]
  );

  if (!activeShops) return null;

  return (
    <>
      <div className="px-4 pb-[75px] pt-2">
        <BackButton onClick={() => navigate(RoutesPaths.MAIN)} />
        <AdministrateTitle
          title={t("administrate-page.title")}
          descriptionFirst={t("administrate-page.description.part-1")}
          descriptionSecond={t("administrate-page.description.part-2")}
        />
        <StoreList storeData={activeShops} />
      </div>
      <ControlPanel />
    </>
  );
};

export default Administrate;
