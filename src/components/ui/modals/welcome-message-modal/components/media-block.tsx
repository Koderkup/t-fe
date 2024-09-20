import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import AddIcon from "public/icons/add-fill.svg";
import { useTranslation } from "react-i18next";
import { ImageInputField, ImagePreview, Typography } from "@/components";

const MediaBlock: FC = () => {
  const { t } = useTranslation("bot-settings-page");
  const { register, setValue, watch } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string>("");

  const text = watch("text");

  useEffect(() => {
    if (!text) setImagePreview("");
  }, [text]);

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
    setValue("image", null);
  };

  return (
    <div className="flex w-full flex-col gap-y-2">
      <Typography variant="body-md" color="black_80">
        {t("welcome-message-modal.form.media-input.label")}
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
              required: true,
            })}
          >
            <Typography variant="body-md" color="black_20">
              {t("welcome-message-modal.form.media-input.placeholder")}
            </Typography>
          </ImageInputField>
        )}
      </div>
    </div>
  );
};

export default MediaBlock;
