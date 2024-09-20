import { FC } from "react";
import { useTranslation } from "react-i18next";
import ModalCardRoot from "@/components/ui/modals/modal-card-root.tsx";
import { ModalProps } from "@/components/ui/modals/types.ts";
import { Button, Typography } from "@/components";

const CouponModal: FC<Pick<ModalProps, "showModal" | "onClose">> = ({
  showModal,
  onClose,
}) => {
  const { t } = useTranslation("translation");

  return (
    <ModalCardRoot showModal={showModal} onClose={onClose}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={e => e.stopPropagation()}
        className="absolute left-6 right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-y-2 rounded-3xl bg-white shadow-dropdown"
      >
        <div className="mt-8 h-[216px] w-full bg-coupon-bg bg-cover bg-center" />
        <div className="flex flex-col gap-y-2 px-6 pb-6">
          <Typography
            variant="heading-xl"
            color="black_100"
            className="text-center tracking-[-0.03em]"
            tag="h2"
          >
            {t("coupon-modal.title")}
          </Typography>
          <Typography
            variant="body-base"
            tag="p"
            className="text-center font-normal tracking-[0.01em]"
            color="black_100"
          >
            {t("coupon-modal.description")}
          </Typography>
          <div className="py-2.5">
            <Button className="py-3">{t("coupon-modal.button-text")}</Button>
          </div>
        </div>
      </div>
    </ModalCardRoot>
  );
};

export default CouponModal;
