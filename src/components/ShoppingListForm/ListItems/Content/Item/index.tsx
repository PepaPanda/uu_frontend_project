import { Label } from "./styles.ts";
import { useShoppingList } from "../../../../../context/ShoppingList/useShoppingList";
import type { ShoppingListItem } from "../../../../../types/ShoppingList";

import UnorderedListOfRows from "../../../../../ui_components/UnorderedListOfRows/index.tsx";

import { DeleteButton } from "../../../../../ui_components/DeleteButton/index.tsx";

import {
  fetchDeleteListItem,
  fetchUpdateListItem,
} from "../../../../../helpers/fetchShoppingListItem.ts";
import { toast } from "react-toastify";

const Item = ({
  children,
  resolved,
  itemId,
  disabled = false,
}: {
  children: React.ReactNode;
  resolved: boolean;
  itemId: string;
  disabled: boolean;
}) => {
  const { shoppingList, setShoppingList } = useShoppingList();

  const handleWrapperClick = async () => {
    if (!shoppingList) return toast("Unexpected error");

    const updated = fetchUpdateListItem(
      shoppingList._id,
      itemId,
      !resolved,
      String(children)
    );

    if (!updated)
      return toast("Unable to update the item, please try again later");

    setShoppingList((list) => {
      if (!list) return list;
      return {
        ...list,
        items: list.items.map((itm: ShoppingListItem) => {
          if (itm._id === itemId) {
            return { ...itm, resolved: !itm.resolved };
          }
          return itm;
        }),
      };
    });
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!shoppingList) return toast("Unexpected error");

    const deleted = fetchDeleteListItem(shoppingList._id, itemId);

    if (!deleted)
      return toast("Unable to delete the item, please try again later");

    setShoppingList((list) => {
      if (!list) return list;

      return {
        ...list,
        items: list.items.filter((itm: ShoppingListItem) => {
          if (itm._id === itemId) {
            return false;
          }
          return true;
        }),
      };
    });
  };

  return (
    <UnorderedListOfRows.Item
      onClick={disabled ? () => {} : handleWrapperClick}
      clickable={!disabled}
    >
      <input
        id={itemId}
        type="checkbox"
        checked={resolved}
        readOnly
        disabled={disabled}
      />
      <Label
        htmlFor={itemId}
        onClick={!disabled ? handleLabelClick : () => {}}
        $disabled={disabled}
      >
        {children}
      </Label>
      <DeleteButton onClick={handleDeleteButtonClick} disabled={disabled} />
    </UnorderedListOfRows.Item>
  );
};

export default Item;
