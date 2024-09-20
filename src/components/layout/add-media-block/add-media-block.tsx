import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ImageInputField, ImagePreview, Typography } from "@/components";
import AddIcon from "../../../../public/icons/add-fill.svg";
import { useMainStore } from "@/store/main-store";

type Props = {
  label?: string;
  buttonText?: string;
};

const AddMediaBlock: FC<Props> = ({ label, buttonText }) => {
  const { register, setValue } = useFormContext();
  const [activeMedia, setActiveMedia] = useMainStore(state => [
    state.activeMedia,
    state.setActiveMedia,
  ]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { t } = useTranslation("ad-block-page");

  console.log(activeMedia);

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
        {label || t("ad-block-form.media")}
      </Typography>

      <div className="h-[132px]">
        {imagePreview ? (
          <ImagePreview imageUrl={imagePreview} onClick={handleRemoveImage} />
        ) : (
          <ImageInputField
            iconColor="black_20"
            icon={<AddIcon />}
            {...register("image", { onChange: handleImageSelect })}
          >
            <Typography variant="body-md" color="black_20">
              {buttonText || t("ad-block-form.media-button-text")}
            </Typography>
          </ImageInputField>
        )}
      </div>
    </div>
  );
};

export default AddMediaBlock;
