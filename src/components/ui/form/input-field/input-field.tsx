import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { FieldValues, RegisterOptions } from "react-hook-form";
import FieldControl from "@/components/ui/form/field-control/field-control.tsx";
import { cn } from "@/utils/twMerge.ts";
import FieldHelperText from "@/components/ui/form/field-helper-text/field-helper-text.tsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  label?: string;
  options?: RegisterOptions<FieldValues, string>;
  error?: boolean;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
};

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      fullWidth,
      disabled,
      error,
      leftIcon,
      helperText,
      rightIcon,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <FieldControl label={label} fullWidth={fullWidth}>
        {/* <div
          className={cn(
            "flex h-12 w-full items-center rounded-[20px] border border-black_30",
            error && "!border-error bg-error_light",
            disabled && "bg-[#f8f8f8]",
            className
          )}
          role="presentation"
          onClick={onClick}
        >
          {leftIcon && (
            <div className="flex h-full w-[43px] flex-shrink-0 items-center justify-center rounded-bl-[20px] rounded-tl-[20px] border border-black_30 bg-main_bg">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className="focus-visible:none h-full w-full rounded-xl bg-transparent px-4 text-black_100 outline-none placeholder:text-black_50 focus:outline-none focus:ring-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            disabled={disabled}
            {...props}
            onWheel={e => {
              e.currentTarget.blur();
            }}
          />

          {rightIcon && <div className="mr-4">{rightIcon}</div>}
        </div> */}

        {error && <FieldHelperText>{helperText}</FieldHelperText>}
      </FieldControl>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
