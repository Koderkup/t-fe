import { FC, InputHTMLAttributes, ReactNode } from "react";
import Typography from "../typography/typography";

interface SelectorProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
  title: string;
  description: string;
  id: string;
  isChecked: boolean;
  discount?: number | null;
  type: "theme" | "payment";
  validValue?: string;
}

const Selector: FC<SelectorProps> = ({
  icon,
  title,
  description,
  id,
  validValue,
  isChecked,
  type,
  discount,
  ...rest
}) => {
  return (
    <label htmlFor={id} className="radio-button-container py-2">
      <input
        id={id}
        type="radio"
        value={type === "payment" ? title.toLowerCase() : validValue}
        checked={isChecked}
        {...rest}
      />
      <div className="flex cursor-pointer items-center gap-3">
        <div>{icon}</div>
        <div className="flex flex-col gap-1">
          <div className={discount ? "flex items-center gap-2" : ""}>
            <Typography
              variant="body-base"
              color="black_100"
              className={
                type === "theme"
                  ? "font-normal tracking-[0.01em]"
                  : "font-medium"
              }
            >
              {title}
            </Typography>
            {discount && (
              <div className="flex h-[22px] items-center rounded-[20px] border border-solid border-black_80 px-2">
                <Typography
                  variant="body-sm"
                  color="black_80"
                  className="font-medium"
                >
                  -{discount}%
                </Typography>
              </div>
            )}
          </div>
          <Typography
            variant="body-md"
            color="black_80"
            className="font-normal"
          >
            {description}
          </Typography>
        </div>
      </div>
      <span className="checkmark" />
    </label>
  );
};

export default Selector;
