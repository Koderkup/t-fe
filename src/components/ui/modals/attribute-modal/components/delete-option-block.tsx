import { FC } from "react";
import Flashlight from "public/icons/flashlight.svg";
import { useTranslation } from "react-i18next";
import Typography from "@/components/ui/typography/typography";

interface DeleteOptionBlockProps {
  optionNumber: number;
  clickFn: () => void;
}

const DeleteOptionBlock: FC<DeleteOptionBlockProps> = ({
  optionNumber,
  clickFn,
}) => {
  const { t } = useTranslation("products-pages");

  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Flashlight />
        <Typography variant="body-xl" color="black_100" className="font-medium">
          {t("attribute-modal.form.option")} {optionNumber}
        </Typography>
      </div>
      <button onClick={clickFn}>
        <Typography variant="body-md" className="font-medium !text-[#d83b04]">
          {t("attribute-modal.action-buttons.delete-option")}
        </Typography>
      </button>
    </div>
  );
};

export default DeleteOptionBlock;
