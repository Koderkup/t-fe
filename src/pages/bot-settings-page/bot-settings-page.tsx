import { FC } from "react";
import { BackButton } from "@twa-dev/sdk/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";
import BotSettingsList from "./components/bot-settings-list";
import { useMainStore } from "@/store/main-store";

const BotSettingsPage: FC = () => {
  const { t } = useTranslation("bot-settings-page");
  const [isModalOpen] = useMainStore(state => [state.isModalOpen]);
  const navigate = useNavigate();

  return (
    <div>
      <BackButton
        onClick={() => {
          if (!isModalOpen) navigate(-1);
        }}
      />
      <div className="flex flex-col gap-y-4 px-4 py-6">
        <Typography
          tag="h1"
          variant="heading-lg"
          color="main_black"
          className="tracking-[-0.02em]!"
        >
          {t("page-title")}
        </Typography>
        <BotSettingsList />
      </div>
    </div>
  );
};

export default BotSettingsPage;
