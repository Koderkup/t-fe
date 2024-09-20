import { FC, PropsWithChildren } from "react";
import FieldLabel from "@/components/ui/form/field-label/field-label.tsx";
import { cn } from "@/utils/twMerge.ts";

type Props = PropsWithChildren<{
  label?: string;
  fullWidth?: boolean;
}>;

const FieldControl: FC<Props> = ({ label, fullWidth, children }) => {
  return (
    <div className={cn(fullWidth && "w-full")}>
      {label && <FieldLabel label={label} />}
      {children}
    </div>
  );
};

export default FieldControl;
