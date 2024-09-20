import { FC, PropsWithChildren, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import ArrowRight from "public/icons/arrow-right-line.svg";
import { Typography } from "@/components";
import { cn } from "@/utils/twMerge.ts";

const cellVariants = cva(
  "flex w-full items-center rounded-3xl border border-stroke bg-main_bg cursor-pointer",
  {
    variants: {
      size: {
        medium: "p-4",
        small: "px-4 py-3",
        "menu-size": "px-4 py-[9px]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

type CellProps = VariantProps<typeof cellVariants> &
  PropsWithChildren<{
    icon?: ReactNode;
    onCLick?: () => void;
    className?: string;
    description?: string;
  }>;

const Cell: FC<CellProps> = ({
  icon,
  children,
  size,
  onCLick,
  className,
  description,
}) => {
  return (
    <div
      role="presentation"
      className={cn(cellVariants({ size, className }))}
      onClick={onCLick}
    >
      {icon && (
        <span className="flex h-8 w-8 items-center justify-center rounded-[20px] bg-main_black shadow-navItem">
          <span className="h-4 w-4">{icon}</span>
        </span>
      )}
      {description ? (
        <div className="flex flex-col gap-[2px]">
          <Typography
            className="ml-2.5 flex-grow font-medium"
            variant="body-xl"
          >
            {children}
          </Typography>
          <Typography
            className="ml-2.5 font-normal"
            color="black_80"
            variant="body-sm"
          >
            {description}
          </Typography>
        </div>
      ) : (
        <>
          <Typography
            className="ml-2.5 flex-grow font-medium"
            variant="body-xl"
          >
            {children}
          </Typography>
          <ArrowRight />
        </>
      )}
    </div>
  );
};

export default Cell;
