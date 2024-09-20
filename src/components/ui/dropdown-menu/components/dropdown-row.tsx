import { FC, useMemo } from "react";
import Arrow from "public/icons/input-arrow.svg";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";
import { cn } from "@/utils/twMerge";

interface DropdownRowProps {
  type: "heading-row" | "default-row";
  open?: boolean;
  rowTitle: string;
  itemCount?: number;
  text?: string;
  price: number;
  clickFn: () => void;
  disableRemoveButton?: boolean;
}

const DropdownRow: FC<DropdownRowProps> = ({
  type,
  clickFn,
  open,
  rowTitle,
  itemCount,
  text,
  price,
  disableRemoveButton,
}) => {
  const { t } = useTranslation("translation");

  const itemText = useMemo(() => {
    if (typeof itemCount === "number") {
      return itemCount === 1
        ? `${itemCount} ${t("dropdown-menu.item")}`
        : `${itemCount} ${t("dropdown-menu.items")}`;
    }
    return null;
  }, [itemCount, t]);

  const activeButtonText = useMemo(
    () =>
      open
        ? t("dropdown-menu.menu-actions.close-menu")
        : t("dropdown-menu.menu-actions.menu-open"),
    [open, t]
  );

  return (
    <div
      className={cn("flex flex-col", {
        "border-b-[1px] border-solid border-[#efeff0] pb-[6px]":
          type === "default-row",
      })}
    >
      <div
        className={cn("flex items-center justify-between", {
          "items-end": type === "default-row",
        })}
      >
        <div className="flex flex-col">
          <Typography
            variant={type === "heading-row" ? "body-md" : "body-sm"}
            color="black_60"
            className="font-medium"
          >
            {rowTitle}
          </Typography>
          <Typography
            variant={type === "heading-row" ? "body-base" : "body-xl"}
            color={type === "heading-row" ? "black_100" : "main_black"}
            className={cn("font-normal", {
              "tracking-[-0.04em]": type === "default-row",
            })}
          >
            {type === "heading-row" ? itemText : text}
          </Typography>
        </div>
        <div>
          <Typography
            variant={type === "heading-row" ? "heading-md" : "body-xl"}
            color={type === "heading-row" ? "black_100" : "main_black"}
            className={cn({
              "font-medium tracking-[-0.06em]": type === "default-row",
            })}
            tag="h3"
          >
            ${price}
          </Typography>
        </div>
      </div>
      {!disableRemoveButton && (
        <div
          className={cn(
            "flex justify-end",
            type === "default-row" ? "mt-1" : "mt-[6px]"
          )}
        >
          <button onClick={clickFn} className="flex items-center outline-none">
            <Typography
              variant={type === "heading-row" ? "body-md" : "body-sm"}
              color="black_60"
              className={type === "heading-row" ? "font-medium" : "font-normal"}
              tag="span"
            >
              {type === "heading-row"
                ? activeButtonText
                : t("dropdown-menu.menu-actions.remove-feature")}
            </Typography>
            {type === "heading-row" && (
              <span
                className={cn("rotate-90 transition-all", {
                  "rotate-[270deg]": open,
                })}
              >
                <Arrow />
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownRow;
