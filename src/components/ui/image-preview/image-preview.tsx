import { CSSProperties, FC } from "react";
import { IconButton } from "@/components";
import DeleteIcon from "../../../../public/icons/delete-bin-6-line.svg";

type Props = {
  imageUrl: string;
  onClick: () => void;
};

const ImagePreview: FC<Props> = ({ imageUrl, onClick }) => {
  return (
    <div
      style={{ "--image-url": `url(${imageUrl})` } as CSSProperties}
      className="relative h-[132px] w-40 overflow-hidden rounded-3xl bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
    >
      <IconButton
        className="absolute right-2 top-2 z-20 overflow-hidden rounded-full bg-[#FFFFFF33]"
        onClick={onClick}
      >
        <div className="absolute h-full w-full blur-[4px]" />
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default ImagePreview;
