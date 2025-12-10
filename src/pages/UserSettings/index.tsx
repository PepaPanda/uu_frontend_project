import Box from "../../ui_components/Box";

import UnorderedListOfRows from "../../ui_components/UnorderedListOfRows";
import Gap from "../../ui_components/Gap";
import Button from "../../ui_components/Button";
import Tag from "../../ui_components/Tag";

import { useUser } from "../../context/UserContext/useUser";
import { useShoppingListMultiple } from "../../context/ShoppingListMultiple/useShoppingListMultiple";
import { useShoppingList } from "../../context/ShoppingList/useShoppingList";

import { toast } from "react-toastify";

import type { User } from "../../context/UserContext/UserContext";

import {
  fetchAcceptInvitation,
  fetchDeclineInvitation,
} from "../../helpers/fetchInvitations";
import { useEffect } from "react";

const UserSettings = () => {
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

    if (!accepted) return toast("Unexpected error");
    if (!accepted.ok)
      return toast(accepted.details?.details || "Unexpected error");

    removeInvitationFromUser(listId);
    setShoppingList(null);
    setShoppingListMultiple(null);
    toast("Successfully accepted. You are now a member of the list");
  };

  const handleDecline = async (listId: string) => {
    const declined = await fetchDeclineInvitation(listId);

    if (!declined) return toast("Unexpected error");
    if (!declined.ok)
      return toast(declined?.details?.details || "Unexpected error");

    removeInvitationFromUser(listId);
    toast("Successfully declined");
  };

  const renderInvitationList = () => {
    if (!user || !user.invitationList || user.invitationList.length === 0)
      return <span>No pending invitations...</span>;

    return (
      <UnorderedListOfRows>
        {user.invitationList.map((i) => (
          <UnorderedListOfRows.Item key={i.listId} clickable={false}>
            <Box gap="10px">
              <Tag>{i.invitedBy}</Tag> wants you to join their shopping list
            </Box>
            <Box gap="10px">
              <Button
                style={{ border: "none" }}
                onClick={() => {
                  handleAccept(i.listId);
                }}
              >
                Accept
              </Button>
              <Button
                style={{ border: "none" }}
                onClick={() => {
                  handleDecline(i.listId);
                }}
              >
                Decline
              </Button>
            </Box>
          </UnorderedListOfRows.Item>
        ))}
      </UnorderedListOfRows>
    );
  };

  return (
    <>
      <Box direction="column">
        <h2>Invitations</h2>
        <Gap $height="3px" />
        <span>Shopping lists others invited you to</span>
        <Gap />
        {renderInvitationList()}
      </Box>
    </>
  );
};

export default UserSettings;
