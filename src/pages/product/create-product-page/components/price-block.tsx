import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import DollarIcon from "../../../../../public/icons/dollar-sign.svg";
import { InputField, Label } from "@/components";
import { CreateProductFields } from "@/pages/product/create-product-page/types.ts";

const pricesPreset = [199, 149, 99, 169];

const PriceBlock: FC = () => {
  const { register, setValue, watch } = useFormContext<CreateProductFields>();
  const currentPrice = watch("price");
  const { t } = useTranslation("products-pages");

  const handlePriceSelect = (value: number) => {
    setValue("price", value);
  };

  return (
    <div className="flex w-full flex-col gap-y-1.5">
      <InputField
        label={t("create-product-page.price")}
        placeholder="0"
        leftIcon={<DollarIcon />}
        type="number"
        {...register("price")}
      />

      <div className="relative -left-4 mt-1.5 w-screen">
        <Swiper slidesPerView="auto" spaceBetween={8} className="!px-4">
          {pricesPreset.map(elem => (
            <SwiperSlide key={elem} className="!w-auto">
              <Label
                key={elem}
                onClick={() => handlePriceSelect(elem)}
                selected={currentPrice === elem}
              >
                ${elem}
              </Label>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PriceBlock;
