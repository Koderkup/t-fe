import { FC, PropsWithChildren } from "react";
import { Typography } from "@/components";

const FieldHelperText: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Typography variant="body-md" color="error" className="mt-1">
      {children}
    </Typography>
  );
};

export default FieldHelperText;
