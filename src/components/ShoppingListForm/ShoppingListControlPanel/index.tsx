import TextInput from "../../../ui_components/TextInput";
import Button from "../../../ui_components/Button";
import Box from "../../../ui_components/Box";

import { useState, useEffect } from "react";
import { useShoppingList } from "../../../context/ShoppingList/useShoppingList";
import { useMediaQuery } from "react-responsive";

import { nanoid } from "nanoid/non-secure"; //Temporary - not needed after implementing API
import { toast } from "react-toastify";

import { useSearchParams } from "react-router";

const ShoppingListControlPanel = () => {
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

  const handleAddButtonClick = () => {
    if (newGroceryName.length < 1)
      return toast("you cannot add an empty value :)");

    if (shoppingList?.status === "archived")
      return toast("This list is archived, you cannot add new items.");
    //Try to fetch when api is done here, temporary solution only for local use below
    setShoppingList((list) => {
      if (!list) return null;
      return {
        ...list,
        items: [
          ...list.items,
          { id: nanoid(), name: newGroceryName, resolved: false },
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
          placeholder="name of the item..."
          value={newGroceryName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewGroceryName(e.target.value);
          }}
        />
        <Button onClick={handleAddButtonClick}>Add +</Button>
      </Box>
      <Button
        onClick={handleToggleButtonClick}
        styleType={showResolvedParam ? "dark" : "light"}
      >
        {showResolvedParam ? "Hide resolved" : "Show resolved"}
      </Button>
    </Box>
  );
};

export default ShoppingListControlPanel;
