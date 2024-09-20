import { getTailwindConfig } from "@/utils/get-tailwind-config.ts";

export const fullConfig = getTailwindConfig();

export type VariantTypoComponent =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "span"
  | "div"
  | "label"
  | "code"
  | "small"
  | "em"
  | "b"
  | "i"
  | "strong";

export type TypoVariants =
  | "heading-2xl"
  | "heading-xl"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body-2xl"
  | "body-xl"
  | "body-base"
  | "body-md"
  | "body-sm"
  | "body-xs"
  | "display-lg"
  | "display-md"
  | "display-sm";

export type Colors = keyof typeof fullConfig.theme.colors;
