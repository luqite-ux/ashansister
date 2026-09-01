/**
 * Locale configuration.
 *
 * The site ships English-only today. This module exists so future
 * locales can be added by (1) adding the locale code here and
 * (2) adding a matching dictionary file in `lib/i18n/dictionaries/`.
 * No routes are generated for locales that don't have real,
 * approved translations yet — we never ship an empty language route
 * or a language switcher with nothing behind it.
 */
export const locales = ["en"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
