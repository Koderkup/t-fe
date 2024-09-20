import { FC, ReactNode } from "react";
import { ITooltip, Tooltip as ReactTooltip } from "react-tooltip";

type Props = ITooltip & {
  parent: ReactNode;
  id: string;
  tooltipPlaceholder?: string;
};

const Tooltip: FC<Props> = ({
  children,
  id,
  content,
  parent,
  tooltipPlaceholder,
  ...rest
}) => {
  return (
    <div
      data-tooltip-id={id}
      data-tooltip-content={tooltipPlaceholder}
      className="tooltip-container"
    >
      {parent}
      <ReactTooltip id={id} content={content} {...rest} className="my-tooltip">
        {children}
      </ReactTooltip>
    </div>
  );
};

export default Tooltip;
