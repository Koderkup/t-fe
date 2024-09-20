import { FC, PropsWithChildren, useEffect, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/twMerge.ts";
import Switch from "@/components/ui/form/switch/switch.tsx";

const cardVariants = cva(
  "flex w-full items-center gap-2 border-b border-black_10 cursor-pointer",
  {
    variants: {
      size: {
        medium: "h-[104px] pb-2",
        small: "max-h-[94px] pb-4",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

type Props = VariantProps<typeof cardVariants> &
  PropsWithChildren<{
    className?: string;
    imageUrl?: string;
    onToggle: (isActive: boolean) => void;
    isActive: boolean;
    onClick?: () => void;
    showImage?: boolean;
  }>;

const ToggleItemCard: FC<Props> = ({
  imageUrl,
  className,
  onToggle,
  children,
  size,
  isActive,
  onClick,
  showImage = true,
}) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleChange = () => {
    setActive(prev => !prev);
    onToggle(!active);
  };

  return (
    <div
      className={cn(cardVariants({ size, className }))}
      role="presentation"
      onClick={onClick}
    >
      {showImage && (
        <img
          className={cn("h-[96px] w-20", imageUrl && "object-cover")}
          src={imageUrl || "images/image-placeholder.svg"}
          alt="preview"
        />
      )}

      <div className="flex flex-grow flex-col self-start overflow-hidden">
        {children}
      </div>

      <Switch name="toggle" checked={active} onChange={handleChange} />
    </div>
  );
};

export default ToggleItemCard;
