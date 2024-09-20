import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { motion } from "framer-motion";
import PopoutWrapper from "@/components/ui/popouts/popout-wrapper.tsx";

type Props = PropsWithChildren<{
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}>;

const actionSheet = {
  hidden: {
    y: "120%",
    x: "8px",
  },
  visible: {
    y: 0,
    x: "8px",
    opacity: 1,
  },
};

const ActionSheet: FC<Props> = ({ show, children, setShow }) => {
  return (
    <PopoutWrapper showPopout={show} onClose={() => setShow(false)}>
      <motion.div
        className="absolute bottom-2.5 z-20 w-[calc(100%-16px)] rounded-3xl border border-stroke bg-main_bg py-2"
        variants={actionSheet}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {children}
      </motion.div>
    </PopoutWrapper>
  );
};

export default ActionSheet;
