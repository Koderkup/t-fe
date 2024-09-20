import { FC, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ModalProps } from "@/components/ui/modals/types.ts";
import { Button } from "@/components";
import ModalSettingsRoot from "../modal-settings-root";
import { ORDER_STATUS } from "./data";
import ModalHeader from "./components/modal-header";
import OrderStatusCard from "./components/order-status-card";
import { useOrdersAPI } from "@/hooks/api/useOrdersAPI";

const OrderStatusModal: FC<Pick<ModalProps, "showModal" | "onClose">> = ({
  showModal,
  onClose,
}) => {
  const params = useParams<{ orderId: string }>();
  const { updateOrder } = useOrdersAPI(params.orderId);
  const { t } = useTranslation("orders-pages");
  const [orderStatus, setOrderStatus] = useState("");

  const activeOrderIdx = useMemo(
    () => ORDER_STATUS.findIndex(status => status.name === orderStatus),
    [orderStatus]
  );

  const handleStatusChange = useCallback((statusName: string) => {
    setOrderStatus(statusName);
  }, []);

  return (
    <ModalSettingsRoot showModal={showModal} onClose={onClose}>
      <div className="flex min-h-full items-end">
        <motion.div
          key="dialog"
          initial={{ y: "100%" }}
          animate={{ y: "0" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={e => e.stopPropagation()}
          className="z-20 w-full rounded-t-[10px] bg-white"
        >
          <ModalHeader clickFn={onClose} onStatusChange={handleStatusChange} />
          <ul className="flex flex-col px-4">
            {ORDER_STATUS.map((status, idx) => {
              const lastStatusIdx = ORDER_STATUS.length - 1;
              const previousElement = activeOrderIdx - 1 === idx && orderStatus;
              return (
                <OrderStatusCard
                  key={status.name}
                  onStatusChange={handleStatusChange}
                  name={status.name}
                  icon={status.icon}
                  idx={idx}
                  lastStatusIdx={lastStatusIdx}
                  previousElement={!!previousElement}
                  orderStatus={orderStatus}
                />
              );
            })}
          </ul>
          <div className="px-4 pb-[19px] pt-2.5">
            <Button
              onClick={() => {
                onClose();
                updateOrder.mutate({
                  id: params.orderId,
                  status: orderStatus,
                });
                setOrderStatus("");
              }}
              className="py-3"
              disabled={!orderStatus}
            >
              {t("status-modal.button-text")}
            </Button>
          </div>
        </motion.div>
      </div>
    </ModalSettingsRoot>
  );
};

export default OrderStatusModal;
