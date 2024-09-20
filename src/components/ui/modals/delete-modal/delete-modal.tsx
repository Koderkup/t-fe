import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import ModalCardRoot from "@/components/ui/modals/modal-card-root.tsx";
import { ModalProps } from "@/components/ui/modals/types.ts";
import Typography from "../../typography/typography";
import Button from "../../button/button";
import { useMainStore } from "@/store/main-store";
import { CreateProductFields } from "@/pages/product/create-product-page/types";

const DeleteModal: FC<Pick<ModalProps, "showModal" | "onClose">> = ({
  showModal,
  onClose,
}) => {
  const { t } = useTranslation("products-pages");
  const { setValue } = useFormContext<CreateProductFields>();
  const [toggleLabelInput] = useMainStore(state => [state.toggleLabelInput]);

  return (
    <ModalCardRoot showModal={showModal} onClose={onClose}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={e => e.stopPropagation()}
        className="absolute left-[49px] right-[49px] top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-y-2 rounded-3xl bg-white px-6 pb-4 pt-8 shadow-dropdown"
      >
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-col items-center gap-y-2">
            <Typography
              variant="body-2xl"
              color="black_100"
              className="text-center font-medium"
            >
              {t("delete-modal.title")}
            </Typography>
            <Typography
              className="text-center font-normal"
              variant="body-md"
              color="black_100"
            >
              {t("delete-modal.text")}
            </Typography>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <button type="button" onClick={onClose} className="w-full">
              <Typography
                variant="body-base"
                className="font-normal"
                color="main_black"
              >
                {t("delete-modal.button-actions.cancel")}
              </Typography>
            </button>
            <Button
              onClick={() => {
                toggleLabelInput(false);
                setValue("featuredText", "");
                onClose();
              }}
              className="py-[13px]"
            >
              {t("delete-modal.button-actions.delete")}
            </Button>
          </div>
        </div>
      </div>
    </ModalCardRoot>
  );
};

export default DeleteModal;
