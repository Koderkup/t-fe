import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { InputField, Label, Typography } from "@/components";
import { PromoCodeFormFields } from "@/components/layout/promo-code-form/types.ts";

const discountsPreset = ["20", "10", "5"];

const DiscountBlock: FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PromoCodeFormFields>();
  const currentDiscount = watch("discount");
  const { t } = useTranslation(["promo-codes", "translation"]);

  const handlePriceSelect = (value: string) => {
    setValue("discount", value);
  };

  return (
    <div className="flex w-full flex-col gap-y-1.5">
      <InputField
        label={t("promo-code-form.discount", { ns: "promo-codes" })}
        placeholder="0"
        autoComplete="off"
        type="number"
        leftIcon={
          <Typography variant="body-base" color="main_black">
            %
          </Typography>
        }
        error={!!errors.discount}
        helperText={errors.discount?.message}
        {...register("discount", {
          required: t("error-messages.required", { ns: "translation" }),
        })}
      />

      <div className="relative -left-4 mt-1.5 w-screen">
        <Swiper slidesPerView="auto" spaceBetween={8} className="!px-4">
          {discountsPreset.map(elem => (
            <SwiperSlide key={elem} className="!w-auto">
              <Label
                key={elem}
                onClick={() => handlePriceSelect(elem)}
                selected={currentDiscount === elem}
              >
                {elem}%
              </Label>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountBlock;
