import { FC } from "react";
import Camera from "public/icons/camera.svg";
import { cn } from "@/utils/twMerge";

interface AvatarProps {
  mediaUrl?: string;
  type?: "admin" | "preview";
}

const Avatar: FC<AvatarProps> = ({ mediaUrl, type }) => {
  return mediaUrl ? (
    <div className={cn(type === "admin" ? "h-20 w-20" : "h-[77px] w-[77px]")}>
      <img
        src={mediaUrl}
        alt="shop-avatar"
        className={cn(
          "h-full w-full max-w-full object-cover",
          type === "admin" ? "rounded-[40px]" : "rounded-[39px]"
        )}
      />
    </div>
  ) : (
    <div
      className={cn(
        "flex items-center justify-center rounded-[40px] bg-white",
        type === "admin"
          ? "h-20 w-20 rounded-[40px]"
          : "h-[77px] w-[77px] rounded-[39px] border border-solid border-black_40"
      )}
    >
      <Camera />
    </div>
  );
};

export default Avatar;
