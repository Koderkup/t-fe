import { SingleValue } from "react-select";
import { LanguagesTypes } from "@/shared/constants.ts";

export const getLanguageDefaultOption = (
  options: SingleValue<{
    value: LanguagesTypes;
    label: string;
  }>[],
  language: LanguagesTypes
) => {
  return options.find(elem => elem && elem.value === language);
};
