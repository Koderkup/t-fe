import { LanguagesTypes } from "@/shared/constants.ts";

export const saveLanguageToStorage = (lang: LanguagesTypes) => {
  localStorage.setItem("lang", lang);
};

export const getLanguageFromStorage = () => {
  const lang = localStorage.getItem("lang");
  return lang || LanguagesTypes.EN;
};
