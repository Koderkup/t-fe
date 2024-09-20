import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import StarIcon from "../../../../../public/icons/Star.svg";
import { Typography } from "@/components";
import Switch from "@/components/ui/form/switch/switch.tsx";
import { CreateProductFields } from "@/pages/product/create-product-page/types.ts";

const FeaturedBlock: FC = () => {
  const { register } = useFormContext<CreateProductFields>();
  const { t } = useTranslation("products-pages");

  return (
    <div className="flex items-center gap-x-2">
      <StarIcon />
      <Typography variant="body-base" color="black_100" className="flex-grow">
        {t("create-product-page.featured")}
      </Typography>
      <Switch defaultChecked={false} {...register("featured")} />
    </div>
  );
};

export default FeaturedBlock;
