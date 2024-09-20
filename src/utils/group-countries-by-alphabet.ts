interface GroupedCountries {
  [key: string]: Array<{ label: string; value: string }>;
}

export const groupCountriesByAlphabet = (
  countries: Array<string>
): Array<{
  label: string;
  options: Array<{ label: string; value: string }>;
}> => {
  const grouped = countries.reduce<GroupedCountries>((acc, country) => {
    const firstLetter = country.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push({ label: country, value: country });
    return acc;
  }, {});

  return Object.keys(grouped)
    .sort()
    .map(letter => ({
      label: letter,
      options: grouped[letter],
    }));
};
