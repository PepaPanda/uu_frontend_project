import { useState, useEffect } from "react";

import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type ThemeContextType = {
  theme: "light" | "dark" | null;
  setTheme: Dispatch<SetStateAction<"light" | "dark" | null>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const lsTheme = localStorage.getItem("app_theme");

    //Handle init with no saved value
    if (!theme && !lsTheme) {
      return setTheme("dark");
    }

    //Handle init with saved value
    if (!theme && lsTheme) {
      return setTheme(() => {
        if (lsTheme === "dark" || lsTheme === "light" || lsTheme === null) {
          return lsTheme;
        } else {
          localStorage.removeItem("theme");
          return null;
        }
      });
    }

    //Handle no change
    if (lsTheme === theme) {
      return;
    }

    //Handle changing language
    if (theme) localStorage.setItem("app_theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
