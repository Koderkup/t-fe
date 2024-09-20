import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/twMerge.ts";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 w-full whitespace-nowrap py-4 px-6 rounded-[20px] leading-[140%] transition-all duration-500",
  {
    variants: {
      variant: {
        primary: "bg-main_black font-semibold text-white",
        outline: "bg-white text-black_20",
        ghost: "border-none",
        rounded: "bg-main_black",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        className: "border border-black_10 border-dashed py-[13px] px-4",
      },
      {
        variant: "primary",
        className: "disabled:bg-black_10 disabled:text-[#7e8089]",
      },
      {
        variant: "rounded",
        className:
          "shadow-rounded-button h-[52px] w-[52px] rounded-full cursor-auto p-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  className,
  variant,
  type = "button",
  icon,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
