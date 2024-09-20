import { FC, PropsWithChildren } from "react";
import { cn } from "@/utils/twMerge.ts";

type Props = PropsWithChildren<{
  className?: string;
}>;

const PageContainer: FC<Props> = ({ children, className }) => {
  return <div className={cn("px-4 py-2", className)}>{children}</div>;
};

export default PageContainer;
