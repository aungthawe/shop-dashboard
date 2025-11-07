"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === "development",
    fallbackLng: "en",
    lng: localStorage.getItem("lang") || "en",
    supportedLngs: ["en", "mm"],
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: require("../locales/en/common.json"),
      },
      mm: {
        common: require("../locales/mm/common.json"),
      },
    },
  });

export default i18n;
