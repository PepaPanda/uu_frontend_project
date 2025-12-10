// src/types/ShoppingList.ts
export type ShoppingListItem = {
  _id: string;
  name: string;
  resolved: boolean;
};

export type ShoppingListMember = {
  _id: string;
  name: string;
  email: string;
};

export type ShoppingListOwner = ShoppingListMember;

export type ShoppingList = {
  _id: string;
  name: string;
  items: ShoppingListItem[] | [];
  status: "active" | "archived";
  members: ShoppingListMember[];
  owner: ShoppingListOwner;
  createdAt?: string;
  archivedAt: string | null;
  showResolved?: boolean;
};

export type ShoppingListMultiple = ShoppingList[];
