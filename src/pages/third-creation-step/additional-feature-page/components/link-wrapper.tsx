import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/twMerge";

interface LinkWrapperProps {
  url?: string;
  children: ReactNode;
  className: string;
}

const LinkWrapper: FC<LinkWrapperProps> = ({ url, children, className }) => {
  return url ? (
    <Link className={className} to={url}>
      {children}
    </Link>
  ) : (
    <div className={cn("cursor-pointer", className)}>{children}</div>
  );
};

export default LinkWrapper;
