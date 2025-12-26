// src/context/useShoppingList.ts
import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error("useLanguage musí být použit uvnitř <LanguageProvider>");
  }

  return ctx;
};
