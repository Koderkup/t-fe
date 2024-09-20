import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Switch = forwardRef<HTMLInputElement, Props>(
  ({ name, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current!, []);

    return (
      <label
        role="presentation"
        className="inline-flex cursor-pointer items-center"
        htmlFor={name}
        onClick={e => {
          e.stopPropagation();
          innerRef.current?.click();
        }}
      >
        <input
          name={name}
          type="checkbox"
          className="peer sr-only"
          ref={innerRef}
          {...props}
        />
        <div className="peer relative h-[31px] w-[51px] rounded-full bg-[#E9E9EA] after:absolute after:start-[2px] after:top-[2px] after:h-[27px] after:w-[27px] after:rounded-full after:bg-white after:transition-all after:duration-300 after:content-[''] peer-checked:bg-success peer-checked:after:start-[calc(100%-2px)] peer-checked:after:-translate-x-full peer-focus:outline-none" />
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
