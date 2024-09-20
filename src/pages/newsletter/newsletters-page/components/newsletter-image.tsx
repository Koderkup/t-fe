import { FC, useEffect, useState } from "react";
import NewsletterIcon from "public/icons/message-2-line.svg";
import { isImageUrl } from "@/utils/is-image-url.ts";

type Props = {
  imageUrl: string;
};

const NewsletterImage: FC<Props> = ({ imageUrl }) => {
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    (async () => {
      const loadImageResult = await isImageUrl(imageUrl);

      setIsImage(loadImageResult);
    })();
  }, [imageUrl]);

  return (
    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl">
      {isImage ? (
        <img
          src={imageUrl}
          alt="newsletter preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <NewsletterIcon />
      )}
    </div>
  );
};

export default NewsletterImage;
