import { useState } from "react";
import { useTranslation } from "react-i18next";
import { OrderStatusModal, Typography } from "@/components";

const ChangeStatusButton = () => {
  const { t } = useTranslation("orders-pages");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className="py-2.5">
        <button
          onClick={handleClick}
          className="w-full rounded-[20px] border border-solid border-black py-3"
        >
          <Typography
            variant="body-base"
            color="main_black"
            className="text-center font-medium"
          >
            {t("order-details-page.button-text")}
          </Typography>
        </button>
      </div>
      <OrderStatusModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ChangeStatusButton;
