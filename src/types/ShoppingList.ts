// src/types/ShoppingList.ts
export type ShoppingListItem = {
  id: string;
  name: string;
  resolved: boolean;
};

export type ShoppingListMember = {
  id: string;
  name: string;
  email: string;
};

export type ShoppingListOwner = ShoppingListMember;

export type ShoppingList = {
  name: string;
  items: ShoppingListItem[];
  status: "active" | "archived";
  members: ShoppingListMember[];
  owner: ShoppingListOwner;
  showResolved?: boolean;
};
