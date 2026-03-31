export const Locales = {
  EN: "en",
  RU: "ru",
} as const;

export const localeConfigs = [
  {
    key: Locales.EN,
    label: "English",
    flag: "/icons/flags/gb.svg",
  },
  {
    key: Locales.RU,
    label: "Русский",
    flag: "/icons/flags/ru.svg",
  },
];
