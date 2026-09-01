import { type Locale, defaultLocale, isLocale } from "./config"
import en, { type Dictionary } from "./dictionaries/en"

const dictionaries: Record<Locale, Dictionary> = {
  en,
}

/**
 * Resolve a dictionary for a given locale code, falling back to the
 * default locale (English) when the requested locale isn't available.
 * Safe to call with `undefined` or an unrecognized string.
 */
export function getDictionary(locale?: string): Dictionary {
  if (locale && isLocale(locale)) {
    return dictionaries[locale]
  }
  return dictionaries[defaultLocale]
}
