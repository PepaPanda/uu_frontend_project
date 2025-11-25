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
    console.log(shoppingList);
    if (!shoppingList) return;

    const update = () => {
      setShoppingListMultiple((slm) => {
        console.log(slm);
        if (!slm) return null;

        const copy = [...slm];

        let index: null | number = null;

        for (let i = 0; i < copy.length; i++) {
          if (copy[i].id === shoppingList.id) {
            index = i;
            break;
          } else {
            continue;
          }
        }

        console.log(index);
        if (index !== 0 && !index) return null;

        const changedShoppingList = {
          ...copy[index],
          name: shoppingList.name,
          status: shoppingList.status,
          resolvedCount: shoppingList.items.filter((i) => i.resolved).length,
          unresolvedCount: shoppingList.items.filter((i) => !i.resolved).length,
          archivedOn: new Date().toISOString(),
        };

        copy[index] = changedShoppingList;

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
