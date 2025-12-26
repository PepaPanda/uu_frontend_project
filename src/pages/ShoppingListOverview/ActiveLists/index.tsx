//Hooks
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

//Helpers
import { fetchShoppingListMultiple } from "../../../helpers/fetchShoppingListMultiple";
import { fetchCreateShoppingList } from "../../../helpers/fetchCreateShoppingList";
import { toast } from "react-toastify";
import {
  filterShoppingListsByName,
  sortShoppingLists,
} from "../../../helpers/utils";

//Components
import Box from "../../../ui_components/Box";
import Gap from "../../../ui_components/Gap";
import TextInput from "../../../ui_components/TextInput";
import Button from "../../../ui_components/Button";
import Select from "../../../ui_components/Select";
import ShoppingListCardContent from "../../../components/ShoppingListCardContent";
import UnorderedListOfCards from "../../../ui_components/UnorderedListOfCards";
import ModalWindow from "../../../ui_components/Modal";

//Context
import { useShoppingListMultiple } from "../../../context/ShoppingListMultiple/useShoppingListMultiple";
import { useShoppingList } from "../../../context/ShoppingList/useShoppingList";
import { useUser } from "../../../context/UserContext/useUser";
import { useNavigate } from "react-router";
import type { ShoppingList } from "../../../types/ShoppingList";

//Language
import { useLanguage } from "../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../helpers/resolveTranslationString";

const ActiveLists = () => {
  const { language } = useLanguage();

  const isMobile = useMediaQuery({ query: "(max-width:817px)" });
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<"name" | "owner">("name");

  const { user } = useUser();
  const { shoppingListMultiple, setShoppingListMultiple } =
    useShoppingListMultiple();

  const { setShoppingList } = useShoppingList();

  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (!user?._id) return;
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

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShoppingListName, setNewShoppingListName] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddButtonClick = () => {
    openModal();
  };

  const handleChangeShoppingListName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewShoppingListName(e.target.value);
  };

  const handleCreateNewList = async () => {
    //Fetch here +  redirect after

    if (newShoppingListName.length < 1)
      return toast(resolveTranslationString("cannot add empty name", language));
    //All of this below will be removed after actually implementing API...
    if (!user)
      return toast(
        resolveTranslationString(
          "an error occured, try logging out and in",
          language
        )
      );

    const id = await fetchCreateShoppingList(newShoppingListName);

    if (!id)
      return toast(
        resolveTranslationString(
          "an error occured while trying to create a new list",
          language
        )
      );

    const owner = {
      _id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };

    const newList: ShoppingList = {
      _id: id,
      name: newShoppingListName,
      status: "active",
      owner,
      archivedAt: null,
      items: [],
      members: [owner],
    };

    setShoppingListMultiple((list) => {
      if (!list) return null;
      return [...list, newList];
    });

    setShoppingList(() => {
      return newList;
    });

    navigate(`/shopping-list/${id}`);
  };

  const renderList = () => {
    console.log(shoppingListMultiple);
    const filtered = filterShoppingListsByName(
      shoppingListMultiple,
      searchString
    );
    const sorted = sortShoppingLists(filtered, sortBy);
    if (!sorted) return "";

    const activeOnly = sorted.filter((list) => list.status === "active");

    return activeOnly.map((shoppingList) => (
      <UnorderedListOfCards.Card
        key={shoppingList._id}
        link={`/shopping-list/${shoppingList._id}`}
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
          <ShoppingListCardContent.Items>
            <ShoppingListCardContent.Items.Open>
              {shoppingList.items?.filter((i) => !i.resolved).length || "--"}
            </ShoppingListCardContent.Items.Open>
            <ShoppingListCardContent.Items.Total>
              {shoppingList.items?.length || "--"}
            </ShoppingListCardContent.Items.Total>
          </ShoppingListCardContent.Items>
        </ShoppingListCardContent>
      </UnorderedListOfCards.Card>
    ));
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!(value === "name" || value === "owner")) return;
    setSortBy(value);
  };

  return (
    <>
      <Box
        justify="space-between"
        gap="10px"
        direction={isMobile ? "column" : "row"}
      >
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
        <Box gap="10px" justify={isMobile ? "space-between" : "normal"}>
          <Select onChange={handleChangeSort}>
            <Select.Option value="name">
              {resolveTranslationString("sort by", language)}:{" "}
              {resolveTranslationString("name", language)}
            </Select.Option>
            <Select.Option value="owner">
              {resolveTranslationString("sort by", language)}:{" "}
              {resolveTranslationString("owner", language)}
            </Select.Option>
          </Select>
          <Button styleType="dark" onClick={handleAddButtonClick}>
            + {resolveTranslationString("create new list", language)}
          </Button>
          <ModalWindow isOpen={isModalOpen} onRequestClose={closeModal}>
            <Box gap="10px">
              <TextInput
                placeholder={resolveTranslationString(
                  "name of your shopping list",
                  language
                )}
                value={newShoppingListName}
                onChange={handleChangeShoppingListName}
              />
              <Button onClick={handleCreateNewList}>
                {resolveTranslationString("create", language)}
              </Button>
            </Box>
          </ModalWindow>
        </Box>
      </Box>
      <Gap />
      <UnorderedListOfCards>{renderList()}</UnorderedListOfCards>
    </>
  );
};

export default ActiveLists;
