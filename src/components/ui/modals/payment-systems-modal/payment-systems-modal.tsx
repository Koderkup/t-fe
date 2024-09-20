import { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Button, ModalPageRoot, PageContainer, PageInfo } from "@/components";
import { ModalProps } from "@/components/ui/modals/types.ts";
import { PaymentSystemModalType } from "@/pages/payment-systems/types.ts";

type Props = Pick<ModalProps, "showModal" | "onClose"> &
  PropsWithChildren<{
    type: PaymentSystemModalType | null;
  }>;

const PaymentSystemsModal: FC<Props> = ({
  showModal,
  onClose,
  children,
  type,
}) => {
  const { t } = useTranslation("payment-systems-page");
  const title =
    type === "crypto" ? t("modal-crypto-title") : t("modal-fiat-title");

  return (
    <ModalPageRoot showModal={showModal} onClose={onClose}>
      <PageContainer className="relative h-screen overflow-hidden">
        <div className="flex h-full flex-col overflow-hidden">
          <PageInfo title={title} />

          <div className="mb-4 mt-4 overflow-auto">{children}</div>

          <Button className="mt-auto" onClick={onClose}>
            {t("modal-button")}
          </Button>
        </div>
      </PageContainer>
    </ModalPageRoot>
  );
};

export default PaymentSystemsModal;
