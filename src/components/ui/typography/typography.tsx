import { FC, PropsWithChildren, ReactNode } from "react";
import { cn } from "@/utils/twMerge.ts";
import {
  Colors,
  fullConfig,
  TypoVariants,
  VariantTypoComponent,
} from "@/components/ui/typography/types.ts";

type Props = PropsWithChildren & {
  className?: string;
  children?: ReactNode;
  tag?: VariantTypoComponent;
  variant?: TypoVariants;
  color?: Colors;
  centered?: boolean;
};

const Typography: FC<Props> = ({
  tag = "span",
  centered,
  color = "main_black",
  variant,
  className,
  children,
}) => {
  const Component = tag;

  return (
    <Component
      className={cn(
        "typography",
        centered && "text-center",
        variant,
        className
      )}
      style={{ color: fullConfig.theme.colors[color] }}
    >
      {children}
    </Component>
  );
};

export default Typography;
