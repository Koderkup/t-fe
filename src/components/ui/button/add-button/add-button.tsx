import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import AddIcon from "public/icons/add-fill.svg";
import { cn } from "@/utils/twMerge.ts";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
};

const AddButton: FC<Props> = ({
  className,
  type = "button",
  icon,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-y-2 rounded-3xl border border-dashed border-black_10",
        className
      )}
      {...props}
    >
      {icon || (
        <span className="fill-black_20">
          <AddIcon />
        </span>
      )}
      {children}
    </button>
  );
};
export default AddButton;
