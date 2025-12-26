import Box from "../../ui_components/Box";

import UnorderedListOfRows from "../../ui_components/UnorderedListOfRows";
import Gap from "../../ui_components/Gap";
import Button from "../../ui_components/Button";
import Tag from "../../ui_components/Tag";

import { useUser } from "../../context/UserContext/useUser";
import { useMediaQuery } from "react-responsive";
import { useShoppingListMultiple } from "../../context/ShoppingListMultiple/useShoppingListMultiple";
import { useShoppingList } from "../../context/ShoppingList/useShoppingList";

import { toast } from "react-toastify";

import type { User } from "../../context/UserContext/UserContext";

import {
  fetchAcceptInvitation,
  fetchDeclineInvitation,
} from "../../helpers/fetchInvitations";
import { useEffect } from "react";
import ToggleCheckbox from "../../ui_components/ToggleCheckbox";
import Divider from "../../ui_components/Divider";
import Select from "../../ui_components/Select";

//Language
import { useLanguage } from "../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../helpers/resolveTranslationString";

//Theme
import { useTheme } from "../../context/ThemeContext/useTheme";

const UserSettings = () => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });

  const { user, setUser } = useUser();
  const { setShoppingList } = useShoppingList();
  const { setShoppingListMultiple } = useShoppingListMultiple();

  useEffect(() => {
    setUser(null);
  }, [setUser]);

  const removeInvitationFromUser = (id: string) => {
    if (!user) return;

    const newUser: User = {
      ...user,
      invitationList: user.invitationList.filter((inv) => inv.listId !== id),
    };
    setUser(newUser);
  };

  const handleAccept = async (listId: string) => {
    const accepted = await fetchAcceptInvitation(listId);

    if (!accepted)
      return toast(
        resolveTranslationString("unexpected error occured", language)
      );
    if (!accepted.ok)
      return toast(
        accepted.details?.details ||
          resolveTranslationString("unexpected error occured", language)
      );

    removeInvitationFromUser(listId);
    setShoppingList(null);
    setShoppingListMultiple(null);
    toast(
      resolveTranslationString(
        "successfully accepted. You are now a member of the list",
        language
      )
    );
  };

  const handleDecline = async (listId: string) => {
    const declined = await fetchDeclineInvitation(listId);

    if (!declined)
      return toast(
        resolveTranslationString("unexpected error occured", language)
      );
    if (!declined.ok)
      return toast(
        declined?.details?.details ||
          resolveTranslationString("unexpected error occured", language)
      );

    removeInvitationFromUser(listId);
    toast(
      resolveTranslationString("successfully declined invitation", language)
    );
  };

  const renderInvitationList = () => {
    if (!user || !user.invitationList || user.invitationList.length === 0)
      return (
        <span>
          {resolveTranslationString("no pending invitations", language)}...
        </span>
      );

    return (
      <UnorderedListOfRows>
        {user.invitationList.map((i) => (
          <UnorderedListOfRows.Item key={i.listId} clickable={false}>
            <Box gap="10px">
              <Tag>{i.invitedBy}</Tag>{" "}
              {resolveTranslationString(
                "wants you to join their shopping list",
                language
              )}
            </Box>
            <Box gap="10px">
              <Button
                style={{ border: "none" }}
                onClick={() => {
                  handleAccept(i.listId);
                }}
              >
                {resolveTranslationString("accept", language)}
              </Button>
              <Button
                style={{ border: "none" }}
                onClick={() => {
                  handleDecline(i.listId);
                }}
              >
                {resolveTranslationString("decline", language)}
              </Button>
            </Box>
          </UnorderedListOfRows.Item>
        ))}
      </UnorderedListOfRows>
    );
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    if (selectedLang !== "cs" && selectedLang !== "en") return;
    setLanguage(e.target.value);
  };

  const handleDarkModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const darkmodeOn = e.target.checked;
    const finalTheme = darkmodeOn ? "dark" : "light";
    setTheme(finalTheme);
  };

  return (
    <>
      <Box direction="column">
        <h2>{resolveTranslationString("settings", language)}</h2>
        <Gap />
        <Box
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "20px" : "0"}
        >
          <Box direction="column">
            <strong>{resolveTranslationString("darkmode", language)}</strong>
            <span style={{ fontSize: "small" }}>
              {theme === "dark"
                ? resolveTranslationString("darkmode is currently on", language)
                : resolveTranslationString(
                    "lightmode is currently on",
                    language
                  )}
            </span>
          </Box>
          <ToggleCheckbox
            onChange={handleDarkModeChange}
            checked={theme === "dark"}
          />
        </Box>
        <Gap />
        <Box
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "20px" : "0"}
        >
          <Box direction="column">
            <strong>{resolveTranslationString("language", language)}</strong>
            <span style={{ fontSize: "small" }}>
              {resolveTranslationString("select your language", language)}
            </span>
          </Box>
          <Select onChange={handleLanguageChange} value={language || "en"}>
            <Select.Option value="en">English (UK) 🇬🇧</Select.Option>
            <Select.Option value="cs">Czech 🇨🇿</Select.Option>
          </Select>
        </Box>
        <Gap />
        <Divider />
        <Gap />
        <h2>{resolveTranslationString("invitations", language)}</h2>
        <Gap $height="5px" />
        <span style={{ fontSize: "small" }}>
          {resolveTranslationString(
            "shopping lists others invited you to",
            language
          )}
        </span>
        <Gap />
        {renderInvitationList()}
      </Box>
    </>
  );
};

export default UserSettings;
