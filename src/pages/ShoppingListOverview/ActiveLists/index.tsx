//Hooks
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

//Helpers
import { fetchShoppingListMultiple } from "../../../helpers/fetchShoppingListMultiple";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
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
    if (!user) return;
    if (shoppingListMultiple) return;

    (async () => {
      const list = await fetchShoppingListMultiple();
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

  const handleCreateNewList = () => {
    //Fetch here +  redirect after
    const id = nanoid();

    if (newShoppingListName.length < 1) return toast("Cannot add empty name");
    //All of this below will be removed after actually implementing API...
    setShoppingListMultiple((list) => {
      if (!list || !user) return null;
      return [
        ...list,
        {
          id: id,
          name: newShoppingListName,
          status: "active",
          owner: user,
          resolvedCount: 0,
          unresolvedCount: 0,
          archivedOn: null,
        },
      ];
    });

    setShoppingList(() => {
      if (!user) return null;
      return {
        id: id,
        name: newShoppingListName,
        items: [],
        status: "active",
        members: [
          {
            id: user.id || "",
            name: user.name || "",
            email: user.email || "",
          },
        ],
        owner: {
          id: user.id || "",
          name: user.name || "",
          email: user.email || "",
        },
      };
    });

    navigate(`/shopping-list/${id}`);
  };

  const renderList = () => {
    const filtered = filterShoppingListsByName(
      shoppingListMultiple,
      searchString
    );
    const sorted = sortShoppingLists(filtered, sortBy);
    if (!sorted) return "";

    return sorted.map((shoppingList) => (
      <UnorderedListOfCards.Card
        key={shoppingList.id}
        link={`/shopping-list/${shoppingList.id}`}
        highlight={user?.id === shoppingList.owner.id}
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
              {shoppingList.unresolvedCount}
            </ShoppingListCardContent.Items.Open>
            <ShoppingListCardContent.Items.Total>
              {shoppingList.unresolvedCount + shoppingList.resolvedCount}
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
