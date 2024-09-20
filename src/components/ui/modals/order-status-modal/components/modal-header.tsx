import { FC } from "react";
import { useTranslation } from "react-i18next";
import Typography from "@/components/ui/typography/typography";

interface ModalHeaderProps {
  clickFn: () => void;
  onStatusChange: (statusName: string) => void;
}

const ModalHeader: FC<ModalHeaderProps> = ({ clickFn, onStatusChange }) => {
  const { t } = useTranslation("orders-pages");

  return (
    <div className="relative py-[15px] text-center">
      <Typography
        tag="h2"
        variant="body-xl"
        color="black"
        className="font-semibold tracking-[-0.06em]"
      >
        {t("status-modal.title")}
      </Typography>
      <div className="absolute left-[14px] top-[16px]">
        <button
          onClick={() => {
            clickFn();
            onStatusChange("");
          }}
          className="font-SFPro text-[17px] font-normal leading-[129%] tracking-[-0.03em] text-[#007AFF]"
        >
          {t("status-modal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;
