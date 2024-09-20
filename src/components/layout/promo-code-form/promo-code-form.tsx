import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import CalendarIcon from "public/icons/calendar-line.svg";
import { isAfter } from "date-fns";
import { useTranslation } from "react-i18next";
import { DatePicker, FormWrapper, InputField, Typography } from "@/components";
import Switch from "@/components/ui/form/switch/switch.tsx";
import { PromoCodeFormFields } from "@/components/layout/promo-code-form/types.ts";
import DiscountBlock from "@/components/layout/promo-code-form/components/discount-block.tsx";
import { DatepickerType } from "@/components/ui/datepicker/types.ts";
import { PROMO_CODE_DATE_FORMAT } from "@/shared/constants.ts";
import { formatDate, parseStringToDate } from "@/utils/date-fns.ts";

const PromoCodeForm: FC = () => {
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<PromoCodeFormFields>();
  const [showDatepicker, setShowDatepicker] = useState<DatepickerType>(null);
  const { t } = useTranslation(["promo-codes", "translation"]);

  const handleDatePick = (date: Date) => {
    const value = formatDate(date, PROMO_CODE_DATE_FORMAT);

    if (showDatepicker === "startDate") {
      setValue("startDate", value, { shouldValidate: true });

      if (getValues("endDate")) {
        trigger("endDate");
      }
    } else if (showDatepicker === "endDate") {
      setValue("endDate", value, { shouldValidate: true });
    }

    setShowDatepicker(null);
  };

  return (
    <FormWrapper>
      <InputField
        label={t("promo-code-form.name", { ns: "promo-codes" })}
        placeholder={t("promo-code-form.name-placeholder")}
        autoComplete="off"
        {...register("code", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.code}
        helperText={errors.code?.message}
      />

      <DiscountBlock />

      <InputField
        label={t("promo-code-form.start-date", { ns: "promo-codes" })}
        placeholder={t("promo-code-form.date-placeholder", {
          ns: "promo-codes",
        })}
        autoComplete="off"
        rightIcon={<CalendarIcon />}
        {...register("startDate", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
        error={!!errors.startDate}
        helperText={errors.startDate?.message}
        readOnly
        onClick={e => {
          e.stopPropagation();
          setShowDatepicker("startDate");
        }}
      />

      <InputField
        label={t("promo-code-form.end-date", { ns: "promo-codes" })}
        placeholder={t("promo-code-form.date-placeholder", {
          ns: "promo-codes",
        })}
        autoComplete="off"
        rightIcon={<CalendarIcon />}
        {...register("endDate", {
          required: t("error-messages.required", { ns: "translation" }),
          validate: value => {
            if (!getValues("startDate")) return true;

            const start = parseStringToDate(
              getValues("startDate"),
              PROMO_CODE_DATE_FORMAT
            );
            const end = parseStringToDate(value, PROMO_CODE_DATE_FORMAT);

            return isAfter(end, start);
          },
        })}
        error={!!errors.endDate}
        readOnly
        onClick={() => setShowDatepicker("endDate")}
        helperText={
          errors.endDate?.message ||
          t("promo-code-form.end-date-error", { ns: "promo-codes" })
        }
      />

      <div className="flex items-center justify-between py-[9px]">
        <Typography variant="body-base" color="black_100">
          {t("promo-code-form.activate", { ns: "promo-codes" })}
        </Typography>

        <Switch defaultChecked={false} {...register("isActive")} />
      </div>

      <DatePicker
        type={showDatepicker}
        setIsOpen={setShowDatepicker}
        isOpen={!!showDatepicker}
        onDatePick={handleDatePick}
      />
    </FormWrapper>
  );
};

export default PromoCodeForm;
