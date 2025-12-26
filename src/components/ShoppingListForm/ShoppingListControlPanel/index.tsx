import TextInput from "../../../ui_components/TextInput";
import Button from "../../../ui_components/Button";
import Box from "../../../ui_components/Box";

import { useState, useEffect } from "react";
import { useShoppingList } from "../../../context/ShoppingList/useShoppingList";
import { useMediaQuery } from "react-responsive";

import { fetchCreateListItem } from "../../../helpers/fetchShoppingListItem";
import { toast } from "react-toastify";

import { useSearchParams } from "react-router";

//Language
import { useLanguage } from "../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../helpers/resolveTranslationString";

const ShoppingListControlPanel = () => {
  const { language } = useLanguage();

  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });

  const [searchParams, setSearchParams] = useSearchParams();
  const showResolvedParam = searchParams.get("showresolved");

  const [newGroceryName, setNewGroceryName] = useState("");

  const { shoppingList, setShoppingList } = useShoppingList();

  //Update state showResolved variable on btn click
  const handleToggleButtonClick = () => {
    const result = showResolvedParam === "1" ? "0" : "1";

    setSearchParams({ showresolved: result }, { replace: true });
    localStorage.setItem("showresolved", result);
  };

  // Get showresolved from ls on mount
  useEffect(() => {
    const stored = localStorage.getItem("showresolved");
    if (stored == null) return;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("showresolved", stored);
        return next;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  const handleAddButtonClick = async () => {
    if (!shoppingList)
      return toast(
        resolveTranslationString(
          "an unexpected error occured, try reloading the page",
          language
        )
      );

    if (newGroceryName.length < 1)
      return toast(
        resolveTranslationString("you cannot add an empty value", language)
      );

    if (shoppingList.status === "archived")
      return toast(
        resolveTranslationString(
          "this list is archived, you cannot add new items",
          language
        )
      );

    const id = await fetchCreateListItem(newGroceryName, shoppingList._id);

    if (!id)
      return toast(
        resolveTranslationString(
          "an unexpected error occured, try reloading the page",
          language
        )
      );

    //Try to fetch when api is done here, temporary solution only for local use below
    setShoppingList((list) => {
      if (!list) return null;
      return {
        ...list,
        items: [
          ...list.items,
          { _id: id, name: newGroceryName, resolved: false },
        ],
      };
    });

    setNewGroceryName("");
  };

  return (
    <Box
      justify="space-between"
      direction={isMobile ? "column" : "row"}
      gap="10px"
    >
      <Box gap="10px">
        <TextInput
          placeholder={`${resolveTranslationString(
            "name of the item",
            language
          )}...`}
          value={newGroceryName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewGroceryName(e.target.value);
          }}
        />
        <Button onClick={handleAddButtonClick}>
          {resolveTranslationString("add", language)} +
        </Button>
      </Box>
      <Button
        onClick={handleToggleButtonClick}
        styleType={showResolvedParam === "0" ? "dark" : "light"}
      >
        {showResolvedParam === "1"
          ? resolveTranslationString("hide resolved", language)
          : resolveTranslationString("show resolved", language)}
      </Button>
    </Box>
  );
};

export default ShoppingListControlPanel;
