import { components, MultiValueGenericProps } from "react-select";
import Typography from "../../typography/typography";

const MultiValueContainer = (
  props: MultiValueGenericProps<{ label: string; value: string }>
) => {
  const { data, selectProps } = props;
  const values = selectProps.value as
    | Array<{ label: string; value: string }>
    | undefined;

  if (values) {
    const isLastValue = values[values.length - 1].label === data.label;
    const displayValue = isLastValue ? data.label : `${data.label}, `;

    return (
      <components.MultiValueContainer {...props}>
        <Typography
          variant="body-base"
          className="bg-white tracking-[0.01em] text-[#2d313f]"
        >
          {displayValue}
        </Typography>
      </components.MultiValueContainer>
    );
  }
  return null;
};

export default MultiValueContainer;
