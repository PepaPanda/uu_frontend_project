import Box from "../../../ui_components/Box";
import Gap from "../../../ui_components/Gap";
import TextInput from "../../../ui_components/TextInput";
import Button from "../../../ui_components/Button";
import ToggleCheckbox from "../../../ui_components/ToggleCheckbox";
import { ConfirmDelete } from "../../../ui_components/ConfirmAlert";

import styled from "styled-components";

import { useMediaQuery } from "react-responsive";
import { useShoppingList } from "../../../context/ShoppingList/useShoppingList";
import { useShoppingListMultiple } from "../../../context/ShoppingListMultiple/useShoppingListMultiple";
import { useUser } from "../../../context/UserContext/useUser";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { fetchShoppingList } from "../../../helpers/fetchShoppingList";

const Small = styled.span`
  font-size: small;
`;

const Settings = () => {
  const isFirst = useRef(true);
  const { user } = useUser();
  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { shoppingList, setShoppingList } = useShoppingList();
  const { setShoppingListMultiple } = useShoppingListMultiple();
  const [currentListName, setCurrentListName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (!id) return;
    if (deleted) return;

    (async () => {
      if (shoppingList) return setCurrentListName(shoppingList.name);
      const list = await fetchShoppingList(id);
      if (!list) return toast("failed to get shopping list");
      setShoppingList(list);
      setCurrentListName(list.name);
    })();
  }, [shoppingList, setShoppingList, id, deleted]);

  useEffect(() => {
    if (isFirst) {
      isFirst.current = false;
      return;
    }
    setShoppingList(() => null);
  }, [deleted, setShoppingList]);

  const handleClickDelete = () => {
    if (user?.id !== shoppingList?.owner.id)
      return toast("Only owner can delete list");
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    //Fetch Api to delete. On success redirect to index
    setShoppingListMultiple((list) => {
      if (!list) return null;
      return list.filter((sList) => sList.id !== id);
    });
    setDeleted(true);
    navigate("/");
  };

  const handleChangeListNameText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCurrentListName(name);
  };

  const handleSubmitListName = () => {
    if (user?.id !== shoppingList?.owner.id)
      return toast("Only owner can change list name");
    //Fetch API here
    setShoppingList((list) => {
      if (!list) return null;
      return {
        ...list,
        name: currentListName,
      };
    });

    toast("succesfully updated name");
  };

  const handleArchiveToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user?.id !== shoppingList?.owner.id)
      return toast("Only owner can archive list");
    setShoppingList((list) => {
      if (!list) return null;
      return {
        ...list,
        status: e.target.checked ? "archived" : "active",
      };
    });
  };

  return (
    <>
      <Box direction="column" padding={isMobile ? "0" : "120px"}>
        <h1>List settings</h1>
        <Gap />
        <Box direction="column" bg="#f1f1f1" padding="25px" align="normal">
          <Gap $height="12px" />
          <h2>General settings</h2>
          <Small>Manage your list's basic information and status</Small>
          <Gap />
          <span>List name</span>
          <TextInput
            value={currentListName}
            onChange={handleChangeListNameText}
          />
          <Gap $height="7px" />
          <Button styleType="dark" onClick={handleSubmitListName}>
            Save changes
          </Button>
          <Gap />
          <Box
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "20px" : "0"}
          >
            <Box direction="column">
              <strong>Archive List</strong>
              <Small>Hide this list from your active lists overview</Small>
            </Box>
            <ToggleCheckbox
              onChange={handleArchiveToggle}
              checked={shoppingList ? shoppingList.status !== "active" : false}
            />
          </Box>
          <Gap $height="12px" />
        </Box>
        <Gap />

        <Box direction="column" bg="#f1f1f1" padding="25px" align="normal">
          <Gap $height="12px" />
          <h2>Danger zone</h2>
          <Gap $height="7px" />
          <Small>Irreversible changes to your shopping LIST</Small>
          <Gap $height="12px" />
          <Small>
            <strong>
              Permanently delete this shopping list and all it's items. This
              action cannot be undone
            </strong>
          </Small>
          <Gap $height="12px" />
          <Button onClick={handleClickDelete}>Delete list</Button>
          <Gap $height="12px" />
        </Box>
      </Box>
      <ConfirmDelete
        open={confirmOpen}
        itemName="Shopping list"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default Settings;
