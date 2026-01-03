import type { Locale } from "./locales";

export async function getMessages(locale: Locale) {
  switch (locale) {
    case "pt":
      return (await import("../messages/pt.json")).default;
    case "en":
      return (await import("../messages/en.json")).default;
  }
}

