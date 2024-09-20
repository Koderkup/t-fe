import { FC } from "react";
import Arrow from "public/icons/input-arrow.svg";
import { Typography } from "@/components";
import { cn } from "@/utils/twMerge";

interface BotSettingsRowProps {
  text: string;
  className?: string;
  clickFn: () => void;
}

const BotSettingsRow: FC<BotSettingsRowProps> = ({
  text,
  className,
  clickFn,
}) => {
  return (
    <div
      className="relative"
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
      onClick={clickFn}
    >
      <div className={cn("block !w-full py-[12px]", className)}>
        <Typography variant="body-base" className="tracking-[0.01em]">
          {text}
        </Typography>
      </div>
      <span className="input-icon absolute right-0 top-[13px]">
        <Arrow />
      </span>
    </div>
  );
};

export default BotSettingsRow;
