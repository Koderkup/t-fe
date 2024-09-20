import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BotSettingsRow from "./bot-settings-row";
import WelcomeMessageModal from "@/components/ui/modals/welcome-message-modal/welcome-message-modal";
import OrderConfirmationModal from "@/components/ui/modals/order-confirmation-modal/order-confirmation-modal";
import { BOT_SETTINGS_LIST } from "../data";
import { cn } from "@/utils/twMerge";
import { useAppConfigurationAPI } from "@/hooks/api/useAppConfigurationAPI";

const BotSettingsList: FC = () => {
  const { t } = useTranslation("bot-settings-page");
  const { appConfiguration } = useAppConfigurationAPI();

  const [showModal, setShowModal] = useState({
    "welcome-modal": false,
    "order-modal": false,
  });

  const botMessages = useMemo(
    () =>
      typeof appConfiguration.data?.botMessages === "string"
        ? JSON.parse(appConfiguration.data?.botMessages)
        : appConfiguration.data?.botMessages,
    [appConfiguration.data?.botMessages]
  );

  return (
    <div>
      <div className="flex flex-col">
        {BOT_SETTINGS_LIST.map((el, idx) => (
          <BotSettingsRow
            key={el.type}
            text={t(el.text)}
            clickFn={() =>
              setShowModal(prev => ({
                ...prev,
                [el.type]: true,
              }))
            }
            className={cn(
              idx === BOT_SETTINGS_LIST.length - 1
                ? "border-none"
                : "mb-[-1px] border-b border-solid border-[#efeff0]"
            )}
          />
        ))}
      </div>

      <WelcomeMessageModal
        confirmOrder={botMessages?.confirmOrder || ""}
        showModal={showModal["welcome-modal"]}
        onClose={() =>
          setShowModal(prev => ({
            ...prev,
            "welcome-modal": false,
          }))
        }
      />
      <OrderConfirmationModal
        welcome={botMessages?.welcome || ""}
        showModal={showModal["order-modal"]}
        onClose={() =>
          setShowModal(prev => ({
            ...prev,
            "order-modal": false,
          }))
        }
      />
    </div>
  );
};

export default BotSettingsList;
