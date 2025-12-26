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
import {
  fetchDeleteShoppingListDetail,
  fetchEditShoppingListDetail,
} from "../../../helpers/fetchShoppingListDetail";

//Languages
import { useLanguage } from "../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../helpers/resolveTranslationString";

import { useTheme } from "../../../context/ThemeContext/useTheme";

const Small = styled.span`
  font-size: small;
`;

const Settings = () => {
  const { theme } = useTheme();

  const { language } = useLanguage();

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
      if (!list)
        return toast(
          resolveTranslationString("failed to get shopping list", language)
        );
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
    if (user?._id !== shoppingList?.owner._id)
      return toast(
        resolveTranslationString("only owner can delete list", language)
      );
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!shoppingList)
      return toast(resolveTranslationString("unexpected error", language));

    setConfirmOpen(false);
    const deleted = await fetchDeleteShoppingListDetail(shoppingList._id);

    if (!deleted)
      return toast(
        resolveTranslationString(
          "could not delete list, are you the owner?",
          language
        )
      );

    toast(resolveTranslationString("list permanently deleted", language));

    setShoppingListMultiple((list) => {
      if (!list) return null;
      return list.filter((sl) => sl._id !== shoppingList._id);
    });
    setDeleted(true);
    navigate("/");
  };

  const handleChangeListNameText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCurrentListName(name);
  };

  const handleSubmitListName = async () => {
    if (!shoppingList || !user)
      return toast(
        resolveTranslationString(
          "an unexpected error occured, try reloading the page",
          language
        )
      );

    if (user._id !== shoppingList.owner._id)
      return toast(
        resolveTranslationString("only owner can change list name", language)
      );

    const changed = await fetchEditShoppingListDetail(
      shoppingList._id,
      currentListName,
      shoppingList.status
    );

    if (!changed)
      return toast(
        resolveTranslationString(
          "could not change the settings, are you the owner?",
          language
        )
      );

    setShoppingList((list) => {
      if (!list) return null;
      return {
        ...list,
        name: currentListName,
      };
    });

    toast(resolveTranslationString("succesfully updated name", language));
  };

  const handleArchiveToggle = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!shoppingList || !user)
      return toast(
        resolveTranslationString(
          "an unexpected error occured, try reloading the page",
          language
        )
      );

    if (user._id !== shoppingList.owner._id)
      return toast(
        resolveTranslationString("only owner can archive list", language)
      );

    const status = e.target.checked ? "archived" : "active";

    const archived = await fetchEditShoppingListDetail(
      shoppingList._id,
      shoppingList.name,
      status
    );

    if (!archived)
      return toast(
        resolveTranslationString(
          "could not change the settings, are you the owner?",
          language
        )
      );

    setShoppingList((list) => {
      if (!list) return null;
      return {
        ...list,
        status,
        archivedAt: Date(),
      };
    });
  };

  return (
    <>
      <Box direction="column" padding={isMobile ? "0" : "120px"}>
        <h1>{resolveTranslationString("list settings", language)}</h1>
        <Gap />
        <Box
          direction="column"
          bg={theme === "light" ? "#e5e5e5" : "#373737"}
          padding="25px"
          align="normal"
        >
          <Gap $height="30px" />
          <h2>{resolveTranslationString("general settings", language)}</h2>
          <Small>
            {resolveTranslationString(
              "manage your list's basic information and status",
              language
            )}
          </Small>
          <Gap />
          <span>{resolveTranslationString("list name", language)}</span>
          <TextInput
            value={currentListName}
            onChange={handleChangeListNameText}
          />
          <Gap $height="7px" />
          <Button styleType="dark" onClick={handleSubmitListName}>
            {resolveTranslationString("save changes", language)}
          </Button>
          <Gap />
          <Box
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "20px" : "0"}
          >
            <Box direction="column">
              <strong>
                {resolveTranslationString("archive List", language)}
              </strong>
              <Small>
                {resolveTranslationString(
                  "hide this list from your active lists overview",
                  language
                )}
              </Small>
            </Box>
            <ToggleCheckbox
              onChange={handleArchiveToggle}
              checked={shoppingList ? shoppingList.status !== "active" : false}
            />
          </Box>
          <Gap $height="30px" />
        </Box>
        <Gap />

        <Box
          direction="column"
          bg={theme === "light" ? "#e5e5e5" : "#373737"}
          padding="25px"
          align="normal"
        >
          <Gap $height="30px" />
          <h2>{resolveTranslationString("danger zone", language)}</h2>
          <Gap $height="20px" />
          <Small>
            {resolveTranslationString(
              "irreversible changes to your shopping list",
              language
            )}
          </Small>
          <Gap $height="12px" />
          <Small>
            <strong>
              {resolveTranslationString(
                "Permanently delete this shopping list and all it's items. This action cannot be undone.",
                language
              )}
            </strong>
          </Small>
          <Gap $height="12px" />
          <Button onClick={handleClickDelete}>
            {resolveTranslationString("delete list", language)}
          </Button>
          <Gap $height="30px" />
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
