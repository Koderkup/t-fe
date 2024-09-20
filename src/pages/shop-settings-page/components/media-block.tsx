import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import AddIcon from "public/icons/add-fill.svg";
import { useTranslation } from "react-i18next";
import { ImageInputField, ImagePreview, Typography } from "@/components";
import { useMainStore } from "@/store/main-store";

const MediaBlock: FC = () => {
  const { t } = useTranslation("shop-settings-page");
  const { register, setValue } = useFormContext();
  const [activeMedia, setActiveMedia] = useMainStore(state => [
    state.activeMedia,
    state.setActiveMedia,
  ]);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);

    if (images.length) {
      images.forEach(elem => {
        const tempUrl = URL.createObjectURL(elem);
        setImagePreview(tempUrl);
      });
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setActiveMedia(null);
    setValue("image", null);
  };

  useEffect(() => {
    if (activeMedia && imagePreview.length === 0) {
      setImagePreview(activeMedia);
    }
  }, [activeMedia, imagePreview.length]);

  return (
    <div className="flex w-full flex-col gap-y-2">
      <Typography variant="body-md" color="black_80">
        {t("inputs.media-block.label")}
      </Typography>

      <div className="h-[132px]">
        {imagePreview ? (
          <ImagePreview imageUrl={imagePreview} onClick={handleRemoveImage} />
        ) : (
          <ImageInputField
            iconColor="black_20"
            icon={<AddIcon />}
            {...register("image", {
              onChange: handleImageSelect,
            })}
          >
            <Typography variant="body-md" color="black_20">
              {t("inputs.media-block.placeholder")}
            </Typography>
          </ImageInputField>
        )}
      </div>
    </div>
  );
};

export default MediaBlock;
