import ShoppingListControlPanel from "./ShoppingListControlPanel";
import ListItems from "./ListItems";
import Gap from "../../ui_components/Gap";

import { useShoppingList } from "../../context/ShoppingList/useShoppingList";
import { useSearchParams } from "react-router";

import type { ShoppingListItem } from "../../types/ShoppingList";

const ShoppingListForm = () => {
  const [searchParams] = useSearchParams();
  const showResolved = searchParams.get("showresolved") === "1";

  const { shoppingList } = useShoppingList();
  const resolvedItemsCount = shoppingList?.items.filter(
    (itm) => itm.resolved
  ).length;
  const unresolvedItemsCount = shoppingList?.items.filter(
    (itm) => !itm.resolved
  ).length;

  const getItemsToDisplay = (): ShoppingListItem[] => {
    if (shoppingList && !showResolved) {
      return shoppingList.items.filter((item) => !item.resolved);
    } else if (shoppingList) {
      return shoppingList.items;
    } else {
      return [];
    }
  };

  return (
    <>
      <ShoppingListControlPanel />
      <Gap />
      <ListItems>
        <ListItems.Content>
          {getItemsToDisplay().map(({ _id, name, resolved }) => {
            return (
              <ListItems.Content.Item
                resolved={resolved}
                key={_id}
                itemId={_id}
                disabled={shoppingList?.status === "archived"}
              >
                {name}
              </ListItems.Content.Item>
            );
          })}
        </ListItems.Content>
        <Gap />
        <ListItems.Summary
          resolvedItemsCount={resolvedItemsCount}
          unresolvedItemsCount={unresolvedItemsCount}
        />
      </ListItems>
      <Gap />
    </>
  );
};

export default ShoppingListForm;
