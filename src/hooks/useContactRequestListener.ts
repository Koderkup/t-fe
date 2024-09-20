import { useEffect } from "react";
import { useTelegram } from "./useTelegram";
import { useTgStore } from "@/store/tg-store";

const useContactRequestListener = () => {
  const { tg } = useTelegram();
  const { setUserPhoneNumber, userPhoneNumber } = useTgStore();

  useEffect(() => {
    const handleContactRequested = (event: any) => {
      switch (event.status) {
        case "sent":
          setUserPhoneNumber(event.responseUnsafe.contact.phone_number);
          break;
        case "cancelled":
          tg.close();
          break;
        default:
          break;
      }
    };

    if (!userPhoneNumber) {
      tg.onEvent("contactRequested", handleContactRequested);
    }

    return () => {
      if (!userPhoneNumber) {
        tg.offEvent("contactRequested", handleContactRequested);
      }
    };
  }, [setUserPhoneNumber, tg, userPhoneNumber]);
};

export default useContactRequestListener;
