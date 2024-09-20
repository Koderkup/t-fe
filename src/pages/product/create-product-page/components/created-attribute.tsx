import { FC } from "react";
import InputArrow from "public/icons/input-arrow.svg";
import { InputField } from "@/components";

interface CreatedAttributeProps {
  attributeName: string;
  clickFn: () => void;
}

const CreatedAttribute: FC<CreatedAttributeProps> = ({
  attributeName,
  clickFn,
}) => {
  return (
    <div className="relative">
      <InputField
        defaultValue={attributeName}
        className="cursor-pointer"
        readOnly
        onClick={clickFn}
      />
      <div className="absolute right-[16px] top-[13px]">
        <InputArrow />
      </div>
    </div>
  );
};

export default CreatedAttribute;
