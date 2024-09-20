import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ModalProps } from "@/components/ui/modals/types.ts";
import Button from "../../button/button";
import ModalActionRoot from "../modal-action-root";

interface DeleteItemModalProps
  extends Pick<ModalProps, "showModal" | "onClose"> {
  onDelete: () => void;
}

const DeleteItemModal: FC<DeleteItemModalProps> = ({
  showModal,
  onClose,
  onDelete,
}) => {
  const { t } = useTranslation("categories-pages");

  return (
    <ModalActionRoot showModal={showModal} onClose={onClose}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={e => e.stopPropagation()}
        className="absolute bottom-0 left-4 right-4 z-20 flex flex-col items-center gap-y-2 pb-8 pt-2"
      >
        <Button
          className="rounded-[14px] bg-white py-4 font-SFPro text-[20px] font-normal leading-[120%] tracking-[0.02em] text-[#fc4e41]"
          onClick={() => {
            onClose();
            onDelete();
          }}
        >
          {t("delete-modal.delete-category")}
        </Button>
        <Button
          className="rounded-[14px] bg-white py-4 font-SFPro text-[20px] font-semibold leading-[120%] tracking-[0.02em] text-[#0078ff]"
          onClick={onClose}
        >
          {t("delete-modal.cancel")}
        </Button>
      </div>
    </ModalActionRoot>
  );
};

export default DeleteItemModal;
