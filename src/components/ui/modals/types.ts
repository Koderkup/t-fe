import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren<{
  showModal: boolean;
  onClose: () => void;
}>;
