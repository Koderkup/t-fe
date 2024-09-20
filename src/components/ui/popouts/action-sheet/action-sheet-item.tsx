import { FC, PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  icon?: ReactNode;
  onClick: () => void;
}>;

const ActionSheetItem: FC<Props> = ({ icon, children, onClick }) => {
  return (
    <button
      type="button"
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
      className="flex w-full items-center gap-4 p-3 px-6"
    >
      {icon} {children}
    </button>
  );
};

export default ActionSheetItem;
