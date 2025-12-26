import { useState, useEffect } from "react";

import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

type LanguageContextType = {
  language: string | null;
  setLanguage: Dispatch<SetStateAction<string | null>>;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<string | null>(null);
  useEffect(() => {
    const lang = localStorage.getItem("app_language");

    //Handle init with no saved value
    if (!language && !lang) {
      return setLanguage("en");
    }

    //Handle init with saved value
    if (!language && lang) {
      return setLanguage(lang);
    }

    //Handle no change
    if (lang === language) {
      return;
    }

    //Handle changing language
    if (language) localStorage.setItem("app_language", language);
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
