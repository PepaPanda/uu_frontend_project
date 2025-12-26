import translations from "../translations/translations.json";

export const resolveTranslationString = (
  stringKey: string,
  lang: string | null = "en"
) => {
  if (lang !== "cs" && lang !== "en") return "";
  if (!stringKey) return "";

  const translationsObj = JSON.parse(JSON.stringify(translations));

  return (
    (translationsObj[stringKey] && translationsObj[stringKey][lang]) ||
    stringKey
  );
};
