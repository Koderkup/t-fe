import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useImperativeHandle,
  useRef,
} from "react";
import { Colors, fullConfig } from "@/components/ui/typography/types.ts";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  iconColor?: Colors;
};

const ImageInputField = forwardRef<HTMLInputElement, Props>(
  ({ children, multiple, icon, iconColor, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current!, []);

    return (
      <div>
        <button
          type="button"
          className="flex w-auto flex-col items-center justify-center gap-y-2 rounded-3xl border border-dashed border-black_10 px-[45px] py-9"
          onClick={() => innerRef?.current?.click()}
        >
          {icon && (
            <span
              style={{
                fill: fullConfig.theme.colors[iconColor || "black_100"],
              }}
            >
              {icon}
            </span>
          )}
          {children}
        </button>
        <input
          ref={innerRef}
          type="file"
          multiple={multiple}
          accept="image/*"
          className="sr-only"
          {...props}
        />
      </div>
    );
  }
);

ImageInputField.displayName = "ImageInputField";

export default ImageInputField;
