import { Label } from "./styles.ts";
import { nanoid } from "nanoid";
import { useShoppingList } from "../../../../../context/ShoppingList/useShoppingList";
import type { ShoppingListItem } from "../../../../../types/ShoppingList";

import UnorderedListOfRows from "../../../../../ui_components/UnorderedListOfRows/index.tsx";

import { DeleteButton } from "../../../../../ui_components/DeleteButton/index.tsx";

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
  const { setShoppingList } = useShoppingList();
  const id = nanoid();

  const handleWrapperClick = () => {
    console.log("handle");
    setShoppingList((list) => {
      if (!list) return list;

      return {
        ...list,
        items: list.items.map((itm: ShoppingListItem) => {
          if (itm.id === itemId) {
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
    setShoppingList((list) => {
      if (!list) return list;

      return {
        ...list,
        items: list.items.filter((itm: ShoppingListItem) => {
          if (itm.id === itemId) {
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
        id={id}
        type="checkbox"
        checked={resolved}
        readOnly
        disabled={disabled}
      />
      <Label
        htmlFor={id}
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
