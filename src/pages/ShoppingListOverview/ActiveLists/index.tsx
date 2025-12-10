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

const ActiveLists = () => {
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
      if (!list) return toast("failed to get shopping list");
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

    if (newShoppingListName.length < 1) return toast("Cannot add empty name");
    //All of this below will be removed after actually implementing API...
    if (!user) return toast("An error occured, try logging out and in.");

    const id = await fetchCreateShoppingList(newShoppingListName);

    if (!id) return toast("An error occured while trying to create a new list");

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
            Owned by {shoppingList.owner.name}
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
          placeholder="Search by name..."
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        <Box gap="10px" justify={isMobile ? "space-between" : "normal"}>
          <Select onChange={handleChangeSort}>
            <Select.Option value="name">Sort by: name</Select.Option>
            <Select.Option value="owner">Sort by: owner</Select.Option>
          </Select>
          <Button styleType="dark" onClick={handleAddButtonClick}>
            + Create new list
          </Button>
          <ModalWindow isOpen={isModalOpen} onRequestClose={closeModal}>
            <Box gap="10px">
              <TextInput
                placeholder="Name of your shopping list"
                value={newShoppingListName}
                onChange={handleChangeShoppingListName}
              />
              <Button onClick={handleCreateNewList}>Create</Button>
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
