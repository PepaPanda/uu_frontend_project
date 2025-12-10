import { useState } from "react";
import { useEffect } from "react";

import { ShoppingListMultipleContext } from "./ShoppingListMultipleContext";
import type { ShoppingListMultiple } from "../../types/ShoppingList";

import { useShoppingList } from "../ShoppingList/useShoppingList";

export const ShoppingListMultipleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shoppingListMultiple, setShoppingListMultiple] =
    useState<ShoppingListMultiple | null>(null);

  const { shoppingList } = useShoppingList();

  useEffect(() => {
    if (!shoppingList) return;

    const update = () => {
      setShoppingListMultiple((slm) => {
        if (!slm) return null;

        const copy = [...slm];

        let index: null | number = null;

        for (let i = 0; i < copy.length; i++) {
          if (copy[i]._id === shoppingList._id) {
            index = i;
            break;
          } else {
            continue;
          }
        }

        if (index !== 0 && !index) return null;

        console.log(shoppingList);

        const changedShoppingList = {
          ...copy[index],
          name: shoppingList.name,
          status: shoppingList.status,
          archivedAt: shoppingList.archivedAt,
          items: shoppingList.items,
        };

        copy[index] = changedShoppingList;

        console.log(copy);
        return copy;
      });
    };

    update();
  }, [shoppingList]);

  return (
    <ShoppingListMultipleContext.Provider
      value={{ shoppingListMultiple, setShoppingListMultiple }}
    >
      {children}
    </ShoppingListMultipleContext.Provider>
  );
};
