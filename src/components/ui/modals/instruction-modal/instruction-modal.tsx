import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ModalPageRoot, PageContainer, Typography } from "@/components";
import { INSTRUCTION_DATA } from "./data";
import { useTelegram } from "@/hooks/useTelegram";

type Props = {
  showModal: boolean;
  onClose: () => void;
};

const InstructionModal: FC<Props> = ({ showModal, onClose }) => {
  const { tg } = useTelegram();
  const { t } = useTranslation("step-one-page");

  return (
    <ModalPageRoot showModal={showModal} onClose={onClose}>
      <PageContainer className="mt-2">
        <Typography variant="heading-md" tag="h1" color="black_100">
          {t("instruction-modal.title")}
        </Typography>
        <ul className="mt-2 flex flex-col gap-2.5">
          {INSTRUCTION_DATA.map(el => (
            <li key={el.title} className="flex flex-col gap-1">
              <Typography variant="heading-sm" color="black_100">
                {t(el.title)}
              </Typography>
              <Typography
                variant="body-xl"
                className="font-normal"
                color="black_100"
              >
                {t(el["description-1"])}
                <button
                  type="button"
                  className="px-1 text-[18px] font-medium text-black_100"
                  onClick={() => tg.openTelegramLink("https://t.me/BotFather")}
                >
                  @BotFather
                </button>
                {t(el["description-2"])}
              </Typography>
            </li>
          ))}
        </ul>
      </PageContainer>
    </ModalPageRoot>
  );
};

export default InstructionModal;
