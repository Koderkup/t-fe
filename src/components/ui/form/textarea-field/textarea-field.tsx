import {
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { FieldValues, RegisterOptions } from "react-hook-form";
import FieldControl from "@/components/ui/form/field-control/field-control.tsx";
import FieldHelperText from "@/components/ui/form/field-helper-text/field-helper-text.tsx";
import { cn } from "@/utils/twMerge";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  options?: RegisterOptions<FieldValues, string>;
  error?: boolean;
  helperText?: string;
  className?: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, helperText, ...rest }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => innerRef.current!, []);

    const handleResize = () => {
      if (innerRef?.current) {
        innerRef.current.style.height = "auto";
        innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
      }
    };

    useEffect(() => {
      handleResize();
    }, []);

    return (
      <FieldControl label={label}>
        <textarea
          rows={1}
          ref={innerRef}
          onInput={handleResize}
          className={cn(
            "h-12 min-h-12 w-full resize-none overflow-hidden rounded-[20px] border border-black_30 px-4 py-3 text-black_100 outline-none placeholder:text-black_50 focus:ring-0",
            className,
            error && "!border-error bg-error_light"
          )}
          {...rest}
        />

        {error && <FieldHelperText>{helperText}</FieldHelperText>}
      </FieldControl>
    );
  }
);

TextareaField.displayName = "TextareaField";

export default TextareaField;
