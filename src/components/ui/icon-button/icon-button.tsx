import {
  CSSProperties,
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/twMerge.ts";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 cursor-pointer",
  {
    variants: {
      size: {
        medium: "p-2",
        large: "p-4",
      },
    },
    defaultVariants: {
      size: "large",
    },
  }
);

export interface Props
  extends VariantProps<typeof buttonVariants>,
    PropsWithChildren {
  icon?: ReactNode;
  size?: "medium" | "large";
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}

const IconButton: FC<Props> = ({
  icon,
  style,
  size,
  onClick,
  className,
  children,
}) => {
  return (
    <div
      className={cn(buttonVariants({ size, className }))}
      role="none"
      style={style}
      onClick={onClick}
    >
      {icon || children}
    </div>
  );
};

export default IconButton;
