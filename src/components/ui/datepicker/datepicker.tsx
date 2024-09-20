import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";
import { isAfter, startOfDay } from "date-fns";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@/components";
import { lockScroll } from "@/utils/lock-scroll.ts";
import PopoutWrapper from "@/components/ui/popouts/popout-wrapper.tsx";
import Wheel from "@/components/ui/datepicker/components/wheel.tsx";
import { useDatepicker } from "@/hooks/useDatepicker.ts";
import { DatepickerType } from "@/components/ui/datepicker/types.ts";

type Props = {
  setIsOpen: Dispatch<SetStateAction<DatepickerType>>;
  isOpen: boolean;
  onDatePick: (date: Date) => void;
  type: DatepickerType;
};

const datepicker = {
  hidden: {
    x: 0,
    y: "100%",
    transition: { ease: "easeIn", duration: 0.2 },
  },
  visible: {
    x: 0,
    y: "0",
    opacity: 1,
    transition: { ease: "easeIn", duration: 0.2 },
  },
};

const Datepicker: FC<Props> = ({ setIsOpen, isOpen, onDatePick, type }) => {
  const { months, years, days, currentDate, handleDateChange, getInitIdx } =
    useDatepicker(type);
  const { t } = useTranslation("promo-codes");
  const title =
    type === "startDate"
      ? t("promo-code-form.datepicker-start-title")
      : t("promo-code-form.datepicker-end-title");
  const buttonText =
    type === "startDate"
      ? t("promo-code-form.datepicker-start-button")
      : t("promo-code-form.datepicker-end-button");

  useEffect(() => {
    if (isOpen) {
      lockScroll(true);
    }

    return () => {
      lockScroll(false);
    };
  }, [isOpen]);

  const validateDate = () => {
    return !isAfter(currentDate, startOfDay(new Date()));
  };

  return (
    <PopoutWrapper onClose={() => setIsOpen(null)} showPopout={isOpen}>
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 h-[360px] rounded-t-[10px] bg-white px-4"
        variants={datepicker}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="flex justify-center py-[17px]">
          <Typography variant="body-xl" className="font-semibold">
            {title}
          </Typography>
        </div>

        <div className="flex h-[213px] items-center justify-center">
          <div style={{ width: 150, height: 213 }}>
            <Wheel
              loop
              length={months.length}
              width={100}
              perspective="right"
              values={months}
              dateFormat="LLLL"
              onChange={handleDateChange}
              type="month"
              initIdx={getInitIdx("month")}
            />
          </div>
          <div style={{ width: 70, height: 213 }}>
            <Wheel
              loop
              length={days.length}
              width={50}
              values={days}
              dateFormat="dd"
              onChange={handleDateChange}
              type="day"
              initIdx={getInitIdx("day")}
            />
          </div>
          <div style={{ width: 70, height: 213 }}>
            <Wheel
              loop
              length={years.length}
              width={50}
              perspective="left"
              values={years}
              dateFormat="yyyy"
              onChange={handleDateChange}
              type="year"
              initIdx={getInitIdx("year")}
            />
          </div>
        </div>

        <Button
          disabled={validateDate()}
          className="mt-2.5"
          onClick={() => onDatePick(currentDate)}
        >
          {buttonText}
        </Button>
      </motion.div>
    </PopoutWrapper>
  );
};

export default Datepicker;
