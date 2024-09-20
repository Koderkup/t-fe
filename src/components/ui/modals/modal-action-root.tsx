import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ModalProps } from "@/components/ui/modals/types.ts";
import { lockScroll } from "@/utils/lock-scroll.ts";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const ModalActionRoot: FC<ModalProps> = ({ children, showModal, onClose }) => {
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
        {showModal && (
          <motion.div
            key="modal-action"
            className="fixed inset-0 z-10 bg-[rgba(0,0,0,0.05)]"
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="hidden"
            onClick={e => {
              onClose();
              e.stopPropagation();
            }}
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

export default ModalActionRoot;
