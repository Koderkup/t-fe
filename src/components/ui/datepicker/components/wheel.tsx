import { FC, useEffect, useRef, useState } from "react";
import {
  KeenSliderOptions,
  TrackDetails,
  useKeenSlider,
} from "keen-slider/react";
import { cn } from "@/utils/twMerge.ts";
import { WheelType } from "@/components/ui/datepicker/types.ts";
import { formatDate } from "@/utils/date-fns.ts";

type Props = {
  initIdx?: number;
  length: number;
  loop?: boolean;
  perspective?: "left" | "right" | "center";
  width: number;
  values: Date[];
  dateFormat: string;
  type: WheelType;
  onChange: (type: WheelType, value: Date) => void;
};

const Wheel: FC<Props> = ({
  initIdx,
  width,
  length,
  perspective = "center",
  loop,
  values,
  dateFormat,
  onChange,
  type,
}) => {
  const wheelSize = 18;
  const slides = length;
  const slideDegree = 360 / wheelSize;
  const slidesPerView = loop ? 9 : 1;
  const [sliderState, setSliderState] = useState<TrackDetails | null>(null);
  const size = useRef(0);

  const options = useRef<KeenSliderOptions>({
    slides: {
      number: slides,
      origin: loop ? "center" : "auto",
      perView: slidesPerView,
    },

    vertical: true,

    initial: initIdx || 0,
    loop,
    dragSpeed: val => {
      const height = size?.current;
      return (
        val *
        (height /
          ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
          slidesPerView)
      );
    },
    created: s => {
      size.current = s.size;
    },
    updated: s => {
      size.current = s.size;
    },
    detailsChanged: s => {
      setSliderState(s.track.details);
    },
    slideChanged(s) {
      const selected = s.track.details.rel;
      const value = values[selected];

      onChange(type, value);
    },

    rubberband: !loop,
    mode: "free-snap",
  });

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options?.current);

  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2);
  }, [slider]);

  function slideValues() {
    if (!sliderState) return [];
    const offset = loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;

    const result = [];
    for (let i = 0; i < slides; i += 1) {
      const distance = sliderState
        ? (Number(sliderState?.slides[i]?.distance) - offset) * slidesPerView
        : 0;
      const rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };
      const value = values[i];
      result.push({ style, value });
    }
    return result;
  }

  return (
    <div
      className={`wheel keen-slider wheel--perspective-${perspective}`}
      ref={sliderRef}
    >
      <div
        className="wheel__shadow-top"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
      <div className="wheel__inner">
        <div className="wheel__slides" style={{ width: `${width}px` }}>
          {slideValues().map(({ style, value }, idx) => (
            <div
              className={cn(
                "wheel__slide",
                sliderState?.rel === idx && "text-[#2d3242]"
              )}
              style={style}
              key={String(value)}
            >
              <span className="capitalize">
                {formatDate(value, dateFormat)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="wheel__shadow-bottom"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
    </div>
  );
};

export default Wheel;
