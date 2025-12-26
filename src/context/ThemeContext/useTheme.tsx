// src/context/useShoppingList.ts
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme musí být použit uvnitř <ThemeProvider>");
  }

  return ctx;
};
