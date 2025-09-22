import { WordPressCountry } from "@/data/wordpress";

export type CountryAcf = NonNullable<WordPressCountry["acf"]>;
export type CountryAcfKey = keyof CountryAcf;

export const getCountryAcfString = (
  acf: WordPressCountry["acf"],
  ...keys: CountryAcfKey[]
): string | undefined => {
  if (!acf) {
    return undefined;
  }
  for (const key of keys) {
    const raw = acf[key];
    if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }
  return undefined;
};

export const getCountryPopulation = (
  acf: WordPressCountry["acf"]
): string | number | undefined => {
  if (!acf) {
    return undefined;
  }
  return acf.country_population ?? acf.Country_Population;
};

export const formatPopulation = (
  value: string | number | undefined | null
): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value.toLocaleString();
  }
  const cleaned = value.toString().trim();
  if (!cleaned) {
    return undefined;
  }
  const numeric = Number(cleaned.replace(/,/g, ""));
  if (!Number.isNaN(numeric)) {
    return numeric.toLocaleString();
  }
  return cleaned;
};
