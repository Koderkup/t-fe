import { ChangeEvent, FC, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import AddIcon from "../../../../../public/icons/add-fill.svg";
import { ImageInputField, ImagePreview, Typography } from "@/components";
import { CreateProductFields } from "@/pages/product/create-product-page/types.ts";
import { cn } from "@/utils/twMerge.ts";
import { useMainStore } from "@/store/main-store";

const MediaBlock: FC = () => {
  const { control, setValue } = useFormContext<CreateProductFields>();
  const [productMedias, setProductMedias] = useMainStore(state => [
    state.productMedias,
    state.setProductMedias,
  ]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const { t } = useTranslation("products-pages");

  const { field } = useController({
    name: "images",
    control,
  });

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);

    if (images.length) {
      const updatedFiles = [...(field.value || []), ...images];
      images.forEach(elem => {
        const imageUrl = URL.createObjectURL(elem);
        setImagesPreview(prevState => [...prevState, imageUrl]);
      });

      setValue("images", updatedFiles);
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...imagesPreview];
    const updatedFiles = [...(field.value || [])];
    newImages.splice(index, 1);
    updatedFiles.splice(index, 1);

    setImagesPreview(newImages);
    setProductMedias(newImages);
    setValue("images", updatedFiles);
  };

  useEffect(() => {
    if (productMedias && imagesPreview.length === 0) {
      setImagesPreview(productMedias);
    }
  }, [imagesPreview.length, productMedias]);

  return (
    <div className="flex w-full flex-col gap-y-2">
      <Typography variant="body-md" color="black_80">
        {t("create-product-page.media")}
      </Typography>

      <div
        className={cn(
          "relative -left-4",
          imagesPreview?.length > 0 && "w-screen"
        )}
      >
        <Swiper slidesPerView="auto" spaceBetween={8} className="!w-auto !px-4">
          {imagesPreview?.length > 0 &&
            imagesPreview.map((url, idx) => (
              <SwiperSlide key={url} className="!w-auto overflow-hidden">
                <ImagePreview
                  imageUrl={url}
                  onClick={() => handleImageRemove(idx)}
                />
              </SwiperSlide>
            ))}

          <SwiperSlide className="!w-auto">
            <ImageInputField
              iconColor="black_20"
              icon={<AddIcon />}
              multiple
              onChange={handleImageSelect}
            >
              <Typography variant="body-md" color="black_20">
                {t("create-product-page.media-button-text")}
              </Typography>
            </ImageInputField>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MediaBlock;
