import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BackButton } from "@twa-dev/sdk/react";
import { ModalProps } from "@/components/ui/modals/types.ts";
import { lockScroll } from "@/utils/lock-scroll.ts";
import { useMainStore } from "@/store/main-store";
import { cn } from "@/utils/twMerge";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface ModalCardRootProps extends ModalProps {
  type?: "default" | "delete";
}

const ModalCardRoot: FC<ModalCardRootProps> = ({
  children,
  showModal,
  type,
  onClose,
}) => {
  const [toggleModal] = useMainStore(state => [state.toggleModal]);
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    if (showModal) {
      lockScroll(true);
    }

    toggleModal(showModal);

    return () => {
      lockScroll(false);
    };
  }, [showModal, toggleModal]);

  if (modalRoot) {
    return createPortal(
      <AnimatePresence>
        <BackButton onClick={onClose} />
        {showModal && (
          <motion.div
            key="modal-card"
            className={cn(
              "fixed inset-0 z-10",
              type === "delete"
                ? "bg-[rgba(0,0,0,0.05)]"
                : "bg-[rgba(45,50,66,0.3)]"
            )}
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

export default ModalCardRoot;
