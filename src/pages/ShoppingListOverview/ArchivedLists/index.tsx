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

//Language
import { useLanguage } from "../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../helpers/resolveTranslationString";

const ArchivedLists = () => {
  const { language } = useLanguage();

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
      const list = await fetchShoppingListMultiple(user._id);
      if (!list)
        return toast(
          resolveTranslationString("failed to get shopping list", language)
        );
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
          key={shoppingList._id}
          link={`/shopping-list/${shoppingList._id}`}
          border={false}
          color="#8b8b8b"
          highlight={user?._id === shoppingList.owner._id}
        >
          <ShoppingListCardContent>
            <ShoppingListCardContent.Name>
              {shoppingList.name}
            </ShoppingListCardContent.Name>
            <ShoppingListCardContent.Owner>
              {resolveTranslationString("owned by", language)}{" "}
              {shoppingList.owner.name}
            </ShoppingListCardContent.Owner>
            <ShoppingListCardContent.Archived>
              {resolveTranslationString("archived on", language)}{" "}
              {shoppingList.archivedAt
                ? convertIsoStringToYYYYMMDD(shoppingList.archivedAt)
                : "unavailable"}
            </ShoppingListCardContent.Archived>
            <ShoppingListCardContent.ItemsDone>
              {shoppingList.items?.filter((i) => i.resolved).length || "--"} /{" "}
              {shoppingList.items?.length || "--"}{" "}
              {resolveTranslationString("items done", language)}
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
        <h1>{resolveTranslationString("archived shopping lists", language)}</h1>
        <Box gap="10px" justify={isMobile ? "space-between" : "normal"}>
          <TextInput
            placeholder={`${resolveTranslationString(
              "search by name",
              language
            )}...`}
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
          <Select onChange={handleChangeSort}>
            <Select.Option value="archived">
              {resolveTranslationString("sort by", language)}:{" "}
              {resolveTranslationString("recently archived", language)}
            </Select.Option>
            <Select.Option value="owner">
              {resolveTranslationString("sort by", language)}:{" "}
              {resolveTranslationString("owner", language)}
            </Select.Option>
            <Select.Option value="name">
              {resolveTranslationString("sort by", language)}:{" "}
              {resolveTranslationString("name", language)}
            </Select.Option>
          </Select>
        </Box>
      </Box>
      <Gap />
      <UnorderedListOfCards>{renderArchivedList()}</UnorderedListOfCards>
    </>
  );
};

export default ArchivedLists;
