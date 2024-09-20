import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import ruLocale from "i18n-iso-countries/langs/ru.json";
import ukLocale from "i18n-iso-countries/langs/uk.json";
import ptLocale from "i18n-iso-countries/langs/pt.json";
import hiLocale from "i18n-iso-countries/langs/hi.json";
import cnLocale from "i18n-iso-countries/langs/zh.json";
import { useMemo } from "react";

interface GroupedCountries {
  [key: string]: Array<{ label: string; value: string }>;
}

const useCountriesList = (lang: string) => {
  countries.registerLocale(enLocale);
  countries.registerLocale(ruLocale);
  countries.registerLocale(ukLocale);
  countries.registerLocale(ptLocale);
  countries.registerLocale(hiLocale);
  countries.registerLocale(cnLocale);

  const countryObjEn = countries.getNames("en", { select: "official" });
  const countryObj = countries.getNames(lang, { select: "official" });

  const groupCountriesByAlphabet = (
    data: Array<{ label: string; value: string }>
  ): Array<{
    label: string;
    options: Array<{ label: string; value: string }>;
  }> => {
    const grouped = data.reduce<GroupedCountries>((acc, { label, value }) => {
      const firstLetter = label.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push({ label, value });
      return acc;
    }, {});

    return Object.keys(grouped)
      .sort()
      .map(letter => ({
        label: letter,
        options: grouped[letter],
      }));
  };

  const countryArr = useMemo(() => {
    const list = Object.entries(countryObj).map(([key, label]) => ({
      label,
      value: countryObjEn[key],
    }));
    return groupCountriesByAlphabet(list);
  }, [countryObj, countryObjEn]);

  return {
    countryArr,
  };
};

export default useCountriesList;
