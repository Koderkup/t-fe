import { forwardRef } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import FieldControl from "@/components/ui/form/field-control/field-control.tsx";
import { SelectOption } from "./types.ts";

type SelectProps = {
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
  name: string;
  defaultValue?: SelectOption | null;
  disabled?: boolean;
};

const SelectField = forwardRef<any, SelectProps>(
  ({ name, label, options, placeholder, defaultValue, disabled }, ref) => {
    return (
      <FieldControl label={label}>
        <Controller
          name={name}
          render={() => (
            <Select
              ref={ref}
              classNamePrefix="select"
              options={options}
              placeholder={placeholder}
              noOptionsMessage={() => "No options..."}
              isClearable
              isDisabled={disabled}
              defaultValue={defaultValue}
            />
          )}
        />
      </FieldControl>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
