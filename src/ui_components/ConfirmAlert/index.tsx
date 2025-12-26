import { Overlay, Box, ButtonRow, Button } from "./styles";

import { useTheme } from "../../context/ThemeContext/useTheme";
import { useLanguage } from "../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../helpers/resolveTranslationString";

interface ConfirmDeleteProps {
  open: boolean;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDelete({
  open,
  itemName = "this item",
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  if (!open) return null;

  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <Overlay>
      <Box $theme={theme || "light"}>
        <p>
          {resolveTranslationString(
            "are you sure you want to delete",
            language
          )}{" "}
          {itemName}?
        </p>
        <ButtonRow>
          <Button onClick={onCancel}>
            {resolveTranslationString("cancel", language)}
          </Button>
          <Button
            style={{ background: "#e53935", color: "white" }}
            onClick={onConfirm}
          >
            {resolveTranslationString("delete", language)}
          </Button>
        </ButtonRow>
      </Box>
    </Overlay>
  );
}
