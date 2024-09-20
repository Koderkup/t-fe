import { FC, useId } from "react";
import { Typography } from "@/components";

type Props = {
  label: string;
};

const FieldLabel: FC<Props> = ({ label }) => {
  const id = useId();

  return (
    <label className="mb-1.5 block text-start" htmlFor={id}>
      <Typography variant="body-md" color="black_80">
        {label}
      </Typography>
    </label>
  );
};

export default FieldLabel;
