import type { ShoppingListMultiple } from "../types/ShoppingList";

export const convertIsoStringToYYYYMMDD = (isoString: string) => {
  const date = new Date(String(isoString));
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const filterShoppingListsByName = (
  list: ShoppingListMultiple | null,
  filterString: string
) => {
  if (!list) return null;
  return list.filter((shoppingList) =>
    shoppingList.name.toLowerCase().includes(filterString.toLowerCase())
  );
};

export const sortShoppingLists = (
  list: ShoppingListMultiple | null,
  orderType: "name" | "owner" | "archived"
) => {
  if (!list) return null;

  if (orderType === "name") {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (orderType === "owner") {
    return list.sort((a, b) => a.owner.name.localeCompare(b.owner.name));
  } else if (orderType === "archived") {
    return list.sort((a, b) => {
      const A = a.archivedAt ?? "9999-12-31T00:00:00Z";
      const B = b.archivedAt ?? "9999-12-31T00:00:00Z";
      return A < B ? 1 : -1;
    });
  }
};
