import { FC } from "react";
import Typography from "../typography/typography";
import { cn } from "@/utils/twMerge";

interface PageInfoCardProps {
  title: string;
  description: string;
  pageType: "feature" | "design";
  price?: number;
  imgUrl?: string;
}

const PageInfoCard: FC<PageInfoCardProps> = ({
  pageType,
  title,
  description,
  price,
  imgUrl,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col",
        pageType === "feature" ? "gap-6" : "gap-4 px-4"
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          pageType === "feature" ? "gap-3" : "gap-2"
        )}
      >
        {pageType === "feature" ? (
          <div className="flex items-center justify-between">
            <Typography variant="heading-xl" tag="h1" color="main_black">
              {title}
            </Typography>
            <Typography variant="heading-xl" color="main_black">
              ${price}
            </Typography>
          </div>
        ) : (
          <Typography variant="heading-md" tag="h1" color="main_black">
            {title}
          </Typography>
        )}
        <Typography
          variant="body-base"
          tag="p"
          color="black_90"
          className="font-normal"
        >
          {description}
        </Typography>
      </div>
      <div className="h-[303px] w-full">
        <img
          src={imgUrl}
          alt={title}
          className="h-full w-full max-w-full object-cover"
        />
      </div>
    </div>
  );
};

export default PageInfoCard;
