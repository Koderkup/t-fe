import { FC, ReactNode } from "react";
import { cn } from "@/utils/twMerge.ts";
import { Typography } from "@/components";

type Props = {
  before?: ReactNode;
  after: ReactNode;
  className?: string;
  showBorderBottom?: boolean;
  onClick?: () => void;
  title: ReactNode;
  description?: string;
};

const SimpleCell: FC<Props> = ({
  className,
  description,
  after,
  before,
  title,
  showBorderBottom,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer gap-2.5 py-3",
        showBorderBottom && "border-b border-black_10",
        className
      )}
      onClick={onClick}
      role="presentation"
    >
      {before && before}

      <div className="flex flex-grow flex-col gap-1">
        {title && title}

        {description && (
          <Typography variant="body-md">{description}</Typography>
        )}
      </div>

      {after && after}
    </div>
  );
};

export default SimpleCell;
