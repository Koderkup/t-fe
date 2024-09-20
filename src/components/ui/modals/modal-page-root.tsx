import { FC, PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BackButton } from "@twa-dev/sdk/react";
import { useMainStore } from "@/store/main-store";

type Props = PropsWithChildren<{
  showModal: boolean;
  onClose: () => void;
}>;

const modal = {
  visible: { top: 0 },
  hidden: { top: "100%" },
};

const ModalPageRoot: FC<Props> = ({ children, showModal, onClose }) => {
  const [toggleModal] = useMainStore(state => [state.toggleModal]);
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    toggleModal(showModal);
  }, [showModal, toggleModal]);

  if (modalRoot) {
    return createPortal(
      <AnimatePresence>
        <BackButton onClick={onClose} />
        {showModal && (
          <motion.div
            key="modal-page"
            className="fixed left-0 right-0 z-10 h-screen bg-white"
            transition={{ ease: "easeOut", duration: 0.3 }}
            variants={modal}
            animate="visible"
            initial="hidden"
            exit="hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>,
      modalRoot
    );
  }

  return null;
};

export default ModalPageRoot;
