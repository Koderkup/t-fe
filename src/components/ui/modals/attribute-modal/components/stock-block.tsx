import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Typography } from "@/components";
import Switch from "@/components/ui/form/switch/switch.tsx";
import { AttributesFields } from "@/shared/types/product.interface";

interface StockBlockProps {
  optionNumber: number;
}

const StockBlock: FC<StockBlockProps> = ({ optionNumber }) => {
  const { t } = useTranslation("products-pages");
  const { register } = useFormContext<AttributesFields>();

  return (
    <div className="flex items-center gap-x-2">
      <Typography variant="body-base" color="black_100" className="flex-grow">
        {t("attribute-modal.form.in-stock")}
      </Typography>
      <Switch
        defaultChecked={false}
        {...register(`options.${optionNumber}.inStock`)}
      />
    </div>
  );
};

export default StockBlock;
