export const TOTAL_STEPS = 6;

export const EMAIL_VALIDATION_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PHONE_NUMBER_VALIDATION_PATTERN =
  /^\+\d{1,3}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{4,9}$/;

export const HEX_CODE_VALIDATION_PATTERN = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const PROMO_CODE_DATE_FORMAT = "dd MMMM, yyyy";

export const NEWSLETTER_TODAY_DATE_FORMAT = "H:mm";
export const NEWSLETTER_PAST_DATE_FORMAT = "LLL dd";

export enum LanguagesTypes {
  EN = "en",
  RU = "ru",
  HI = "hi",
  PT = "pt",
  UK = "uk",
  ZH = "zh",
}
