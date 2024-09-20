import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BackButton } from "@twa-dev/sdk/react";
import { ModalProps } from "@/components/ui/modals/types.ts";
import { lockScroll } from "@/utils/lock-scroll.ts";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const ModalSettingsRoot: FC<ModalProps> = ({
  children,
  showModal,
  onClose,
}) => {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    if (showModal) {
      lockScroll(true);
    }

    return () => {
      lockScroll(false);
    };
  }, [showModal]);

  if (modalRoot) {
    return createPortal(
      <AnimatePresence>
        <BackButton onClick={onClose} />
        {showModal && (
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 z-10 bg-[rgba(45,50,66,0.3)]"
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="hidden"
            onClick={() => {
              onClose();
            }}
          >
            <div className="fixed inset-0 z-[11] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      modalRoot
    );
  }

  return null;
};

export default ModalSettingsRoot;
