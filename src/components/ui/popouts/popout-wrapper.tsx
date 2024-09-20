import { FC, PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lockScroll } from "@/utils/lock-scroll.ts";

type Props = PropsWithChildren<{
  showPopout: boolean;
  onClose: () => void;
}>;

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const PopoutWrapper: FC<Props> = ({ children, showPopout, onClose }) => {
  const modalRoot = document.getElementById("popout-root");

  useEffect(() => {
    if (showPopout) {
      lockScroll(true);
    }

    return () => {
      lockScroll(false);
    };
  }, [showPopout]);

  if (modalRoot) {
    return createPortal(
      <AnimatePresence mode="wait">
        {showPopout && (
          <motion.div
            className="fixed inset-0 z-10 bg-[rgba(45,50,66,0.3)]"
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="hidden"
            onClick={e => {
              e.stopPropagation();
              onClose();
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

export default PopoutWrapper;
