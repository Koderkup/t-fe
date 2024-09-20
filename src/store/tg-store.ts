import { create } from "zustand";

import { persist } from "zustand/middleware";
import { TgStore } from "./types";
import { phoneNumberFormatCheck } from "./helpers";

export const useTgStore = create<TgStore>()(
  persist(
    set => ({
      setUserPhoneNumber: data =>
        set(() => {
          const phoneNumber = phoneNumberFormatCheck(data);
          return {
            userPhoneNumber: phoneNumber,
          };
        }),
    }),
    {
      name: "tg-storage",
    }
  )
);
