import * as dateFnsLocales from "date-fns/locale";
import { format, Locale, parse } from "date-fns";
import i18n from "@/i18n.ts";

interface Locales {
  [key: string]: Locale;
}

const locales: Locales = {
  pt: dateFnsLocales.ptBR,
  en: dateFnsLocales.enUS,
  zh: dateFnsLocales.zhCN,
  ru: dateFnsLocales.ru,
  hi: dateFnsLocales.hi,
};

const getDateFnsLocale = (): Locale => {
  return locales[i18n.language];
};

export const formatDate = (date: Date, dateFormat: string) => {
  return format(date, dateFormat, { locale: getDateFnsLocale() });
};

export const parseStringToDate = (date: string, dateFormat: string) => {
  return parse(date, dateFormat, new Date(), {
    locale: getDateFnsLocale(),
  });
};

export default getDateFnsLocale;
