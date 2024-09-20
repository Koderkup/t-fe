import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTelegram } from "@/hooks/useTelegram";
import { InstructionModal } from "@/components";

const BotTokenLinks: FC = () => {
  const { t } = useTranslation(["step-one-page"]);
  const { tg } = useTelegram();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="ml-1 mt-1 text-[14px] font-normal leading-[145%] text-black_70">
        {t("step-one-page.botTokenText.head_over_to")}
        <button
          type="button"
          className="px-1 text-[14px] font-semibold text-black_100"
          onClick={() => tg.openTelegramLink("https://t.me/BotFather")}
        >
          @BotFather
        </button>
        {t("step-one-page.botTokenText.and")}
        <button
          type="button"
          className="pl-1 text-[14px] font-semibold text-black_100"
          onClick={() => setShowModal(true)}
        >
          {t("step-one-page.botTokenText.get_your_token")}
        </button>
        .
      </div>
      <InstructionModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default BotTokenLinks;
