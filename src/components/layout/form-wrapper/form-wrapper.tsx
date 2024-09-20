import { FC, PropsWithChildren } from "react";
import { cn } from "@/utils/twMerge.ts";

type Props = PropsWithChildren<{
  className?: string;
  onSubmit?: () => void;
}>;

const FormWrapper: FC<Props> = ({ onSubmit, className, children }) => {
  return (
    <form
      className={cn("mt-4 flex flex-col gap-y-4", className)}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default FormWrapper;
