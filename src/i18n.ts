import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { getLanguageFromStorage } from "@/utils/language-storage.ts";

i18n.use(Backend).use(initReactI18next).init({
  returnEmptyString: false,
  fallbackLng: "en",
  lng: getLanguageFromStorage(),
});

export default i18n;
