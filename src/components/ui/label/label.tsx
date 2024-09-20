import { FC, PropsWithChildren } from "react";
import { cn } from "@/utils/twMerge.ts";

type Props = PropsWithChildren<{
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}>;

const Label: FC<Props> = ({ children, className, selected, onClick }) => {
  return (
    <button
      type="button"
      className={cn(
        "flex h-[36px] cursor-pointer rounded-[20px] border border-black_100 px-4 py-2 text-sm font-medium text-black_100 transition-all duration-500",
        selected && "bg-black_100 text-white",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Label;
