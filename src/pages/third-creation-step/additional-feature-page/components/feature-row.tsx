import Arrow from "public/icons/input-arrow.svg";
import { FC } from "react";
import { Typography } from "@/components";
import { FeatureType } from "@/shared/types/types";
import LinkWrapper from "./link-wrapper";
import { cn } from "@/utils/twMerge";

interface FeatureRowProps extends FeatureType {
  isSubMenuOpen?: boolean;
}

const FeatureRow: FC<FeatureRowProps> = ({
  featureName,
  url,
  isSubMenuOpen,
}) => {
  return (
    <>
      <LinkWrapper
        url={url}
        className="block !w-full border-b border-solid border-[#efeff0] py-4"
      >
        <Typography variant="body-base" color="main_black">
          {featureName}
        </Typography>
      </LinkWrapper>
      <span
        className={cn("input-icon absolute right-0 top-4 transition-all", {
          "rotate-90": isSubMenuOpen,
        })}
      >
        <Arrow />
      </span>
    </>
  );
};

export default FeatureRow;
