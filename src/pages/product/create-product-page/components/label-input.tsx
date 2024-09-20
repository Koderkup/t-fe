import ClearInput from "public/icons/clear-input.svg";
import { FC, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DeleteModal } from "@/components";
import { CreateProductFields } from "../types";
import { cn } from "@/utils/twMerge";
import { useMainStore } from "@/store/main-store";

interface LabelInputProps {
  className?: string;
}

const LabelInput: FC<LabelInputProps> = ({ className }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLabelInputOpen] = useMainStore(state => [state.isLabelInputOpen]);
  const [input, setInput] = useState({
    isActive: false,
    inputWidth: 36,
  });
  const spanEl = useRef<HTMLSpanElement | null>(null);

  const { watch, register, setValue } = useFormContext<CreateProductFields>();
  const label = watch("featuredText") || "";

  const handleChange = (value: string) => {
    if (spanEl.current) {
      setValue("featuredText", value);
      const newWidth =
        value.length === 0 ? 36 : spanEl.current!.offsetWidth + 10;
      setInput(prev => ({
        ...prev,
        inputWidth: newWidth,
      }));
    }
  };

  useEffect(() => {
    if (!isLabelInputOpen) {
      setInput(prev => ({
        ...prev,
        inputWidth: 36,
      }));
    }
  }, [isLabelInputOpen]);

  return (
    <div>
      <div
        className={cn(
          "flex h-[36px] min-w-[72px] cursor-pointer rounded-[20px] border border-black_100 px-4 outline-none",
          className
        )}
      >
        <input
          type="text"
          placeholder="Label"
          className="min-w-[20px] text-sm font-medium text-black_100 outline-none placeholder:text-black_60"
          {...register("featuredText", {
            onChange: handleChange,
          })}
          style={{
            width: `${input.inputWidth}px`,
          }}
          onChange={e => handleChange(e.target.value)}
          onFocus={() =>
            setInput(prev => ({
              ...prev,
              isActive: true,
            }))
          }
          onBlur={() =>
            setInput(prev => ({
              ...prev,
              isActive: false,
            }))
          }
        />
        {label.length > 0 && !input.isActive && (
          <button type="button" onClick={() => setShowModal(true)}>
            <ClearInput />
          </button>
        )}
        <span
          className="invisible absolute text-sm font-medium text-black_100 opacity-0"
          ref={spanEl}
        >
          {label}
        </span>
      </div>
      <DeleteModal showModal={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default LabelInput;
