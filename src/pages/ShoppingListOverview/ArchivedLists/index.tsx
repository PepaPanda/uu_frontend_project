//Hooks
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

//Helpers
import { fetchShoppingListMultiple } from "../../../helpers/fetchShoppingListMultiple";
import { toast } from "react-toastify";
import {
  convertIsoStringToYYYYMMDD,
  filterShoppingListsByName,
  sortShoppingLists,
} from "../../../helpers/utils";

//Components
import Box from "../../../ui_components/Box";
import Gap from "../../../ui_components/Gap";
import TextInput from "../../../ui_components/TextInput";
import Select from "../../../ui_components/Select";
import ShoppingListCardContent from "../../../components/ShoppingListCardContent";
import UnorderedListOfCards from "../../../ui_components/UnorderedListOfCards";

//Context
import { useShoppingListMultiple } from "../../../context/ShoppingListMultiple/useShoppingListMultiple";
import { useUser } from "../../../context/UserContext/useUser";

const ArchivedLists = () => {
  const isMobile = useMediaQuery({ query: "(max-width:817px)" });

  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "owner" | "archived">("name");

  const { user } = useUser();
  const { shoppingListMultiple, setShoppingListMultiple } =
    useShoppingListMultiple();

  useEffect(() => {
    if (!user) return;
    if (shoppingListMultiple) return;

    (async () => {
      const list = await fetchShoppingListMultiple();
      if (!list) return toast("failed to get shopping list");
      setShoppingListMultiple(list);
    })();
  }, [user, setShoppingListMultiple, shoppingListMultiple]);

  const renderArchivedList = () => {
    const archivedOnly =
      shoppingListMultiple?.filter(
        (shoppingList) => shoppingList.status === "archived"
      ) || null;

    const filtered = filterShoppingListsByName(archivedOnly, searchString);
    const sorted = sortShoppingLists(filtered, sortBy);

    if (!sorted) return "";
    return sorted.map((shoppingList) => {
      return (
        <UnorderedListOfCards.Card
          key={shoppingList.id}
          link={`/shopping-list/${shoppingList.id}`}
          border={false}
          color="#8b8b8b"
          highlight={user?.id === shoppingList.owner.id}
        >
          <ShoppingListCardContent>
            <ShoppingListCardContent.Name>
              {shoppingList.name}
            </ShoppingListCardContent.Name>
            <ShoppingListCardContent.Owner>
              Owned by {shoppingList.owner.name}
            </ShoppingListCardContent.Owner>
            <ShoppingListCardContent.Archived>
              Archived on{" "}
              {shoppingList.archivedOn
                ? convertIsoStringToYYYYMMDD(shoppingList.archivedOn)
                : "unavailable"}
            </ShoppingListCardContent.Archived>
            <ShoppingListCardContent.ItemsDone>
              {shoppingList.resolvedCount} /{" "}
              {shoppingList.resolvedCount + shoppingList.unresolvedCount} Items
              done
            </ShoppingListCardContent.ItemsDone>
          </ShoppingListCardContent>
        </UnorderedListOfCards.Card>
      );
    });
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!(value === "name" || value === "owner" || value === "archived"))
      return;
    setSortBy(value);
  };

  return (
    <>
      <Box
        justify="space-between"
        gap="10px"
        direction={isMobile ? "column" : "row"}
      >
        <h1>Archived Shopping Lists</h1>
        <Box gap="10px" justify={isMobile ? "space-between" : "normal"}>
          <TextInput
            placeholder="Search by name..."
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
          <Select onChange={handleChangeSort}>
            <Select.Option value="archived">
              Sort by: Recently archived
            </Select.Option>
            <Select.Option value="owner">Sort by: Owner</Select.Option>
            <Select.Option value="name">Sort by: Name</Select.Option>
          </Select>
        </Box>
      </Box>
      <Gap />
      <UnorderedListOfCards>{renderArchivedList()}</UnorderedListOfCards>
    </>
  );
};

export default ArchivedLists;
