import { FC, useState } from "react";
import MoreDots from "public/icons/more-dots.svg";
import Edit from "public/icons/edit-line.svg";
import { useTranslation } from "react-i18next";
import {
  ActionSheet,
  ActionSheetItem,
  Avatar,
  IconButton,
  Typography,
} from "@/components";
import { useTelegram } from "@/hooks/useTelegram.ts";
import { useTgStore } from "@/store/tg-store";
import { RoutesPaths } from "@/routes/paths.config";
import usePreloadTranslation from "@/hooks/usePreloadTranslation";
import { useMainStore } from "@/store/main-store";
import { useShopsAPI } from "@/hooks/api/useShopsAPI";

const UserInfo: FC = () => {
  const { user } = useTelegram();
  const [activeShopId] = useMainStore(state => [state.activeShopId]);
  const { preloadFn } = usePreloadTranslation();
  const [userPhoneNumber] = useTgStore(state => [state.userPhoneNumber]);
  const {
    shop: { data },
  } = useShopsAPI(activeShopId || "");
  const [showSettings, setShowSettings] = useState(false);
  const { t } = useTranslation("translation");

  return (
    <div className="flex w-full flex-col gap-y-1 rounded-3xl border border-stroke bg-main_bg bg-dots-bg bg-cover bg-center bg-no-repeat p-4">
      <IconButton className="self-end" onClick={() => setShowSettings(true)}>
        <MoreDots />
      </IconButton>

      <Avatar mediaUrl={data?.mediaUrl} />
      <Typography variant="heading-xl">{data?.name}</Typography>

      <div className="flex items-center gap-x-2">
        <Typography variant="body-sm">{userPhoneNumber}</Typography>
        <span className="h-[5px] w-[5px] rounded-full bg-main_black" />
        <Typography variant="body-sm">@{user?.username}</Typography>
      </div>

      <ActionSheet show={showSettings} setShow={setShowSettings}>
        <ActionSheetItem
          icon={<Edit />}
          onClick={() =>
            preloadFn("shop-settings-page", RoutesPaths.SHOP_SETTINGS)
          }
        >
          <Typography variant="body-base">
            {t("action-sheet.actions.edit")}
          </Typography>
        </ActionSheetItem>
      </ActionSheet>
    </div>
  );
};

export default UserInfo;
