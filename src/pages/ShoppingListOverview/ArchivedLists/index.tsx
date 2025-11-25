//Hooks
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

//Helpers
import { fetchShoppingListMultiple } from "../../../helpers/fetchShoppingListMultiple";
import { toast } from "react-toastify";

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

  const { user } = useUser();
  const { shoppingListMultiple, setShoppingListMultiple } =
    useShoppingListMultiple();

  useEffect(() => {
    if (!user) return;
    if (shoppingListMultiple) return;

    (async () => {
      const list = await fetchShoppingListMultiple();
      if (!list) return toast("failed to get shopping list");
      console.log(list);
      setShoppingListMultiple(list);
    })();
  }, [user, setShoppingListMultiple, shoppingListMultiple]);

  return (
    <>
      <Box
        justify="space-between"
        gap="10px"
        direction={isMobile ? "column" : "row"}
      >
        <h1>Archived Shopping Lists</h1>
        <Box gap="10px" justify={isMobile ? "space-between" : "normal"}>
          <TextInput placeholder="Search by name..." />
          <Select>
            <Select.Option>Sort by: Recently archived</Select.Option>
            <Select.Option>Sort by: Owner</Select.Option>
            <Select.Option>Sort by: Name</Select.Option>
          </Select>
        </Box>
      </Box>
      <Gap />
      <UnorderedListOfCards>
        {shoppingListMultiple
          ?.filter((shoppingList) => shoppingList.status === "archived")
          .map((shoppingList) => {
            return (
              <UnorderedListOfCards.Card
                key={shoppingList.id}
                link={`/shopping-list/${shoppingList.id}`}
              >
                <ShoppingListCardContent>
                  <ShoppingListCardContent.Name>
                    {shoppingList.name}
                  </ShoppingListCardContent.Name>
                  <ShoppingListCardContent.Owner>
                    Owned by {shoppingList.owner}
                  </ShoppingListCardContent.Owner>
                  <ShoppingListCardContent.Items>
                    <ShoppingListCardContent.Items.Open>
                      {shoppingList.unresolvedCount}
                    </ShoppingListCardContent.Items.Open>
                    <ShoppingListCardContent.Items.Total>
                      {shoppingList.unresolvedCount +
                        shoppingList.resolvedCount}
                    </ShoppingListCardContent.Items.Total>
                  </ShoppingListCardContent.Items>
                </ShoppingListCardContent>
              </UnorderedListOfCards.Card>
            );
          })}
      </UnorderedListOfCards>
    </>
  );
};

export default ArchivedLists;
