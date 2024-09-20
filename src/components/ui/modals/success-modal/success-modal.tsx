import { FC } from "react";
import CheckIcon from "public/icons/check-fill.svg";
import { useTranslation } from "react-i18next";
import ModalCardRoot from "@/components/ui/modals/modal-card-root.tsx";
import { ModalProps } from "@/components/ui/modals/types.ts";
import { Typography } from "@/components";

const SuccessModal: FC<Pick<ModalProps, "showModal" | "onClose">> = ({
  showModal,
  onClose,
}) => {
  const { t } = useTranslation("newsletter");

  return (
    <ModalCardRoot showModal={showModal} onClose={onClose}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={e => e.stopPropagation()}
        className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 rounded-2xl bg-white p-6"
      >
        <div className="shadow-success-icon flex h-[32px] w-[32px] items-center justify-center rounded-full bg-main_black">
          <CheckIcon />
        </div>

        <Typography
          variant="body-base"
          color="black_100"
          className="text-center font-medium"
        >
          {t("newsletter-history.modal-text")}
        </Typography>
      </div>
    </ModalCardRoot>
  );
};

export default SuccessModal;
