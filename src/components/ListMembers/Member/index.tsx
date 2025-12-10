import UnorderedListOfRows from "../../../ui_components/UnorderedListOfRows";
import { DeleteButton } from "../../../ui_components/DeleteButton";
import Icon from "../../../ui_components/Icon";
import Box from "../../../ui_components/Box";
import Tag from "../../../ui_components/Tag";

import { useShoppingList } from "../../../context/ShoppingList/useShoppingList";
import { useShoppingListMultiple } from "../../../context/ShoppingListMultiple/useShoppingListMultiple";
import { useUser } from "../../../context/UserContext/useUser";
import { useNavigate } from "react-router";

import userImg from "./user.png";

import styled from "styled-components";
import { toast } from "react-toastify";
import { fetchDeleteShoppingListUser } from "../../../helpers/fetchDeleteShoppingListUser";

const Email = styled.span`
  font-size: small;
`;

const Username = styled.span`
  font-size: small;
  font-weight: bolder;
`;

const Member = ({
  children,
  email,
  owner = false,
  memberId,
}: {
  children: React.ReactNode;
  email: string;
  owner?: boolean;
  memberId: string;
}) => {
  const { shoppingList, setShoppingList } = useShoppingList();
  const { setShoppingListMultiple } = useShoppingListMultiple();
  const { user } = useUser();

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!shoppingList || !user)
      return toast("Unexpected error, try reloading the page");

    const isOwner = user._id === shoppingList.owner._id;
    const isUserSelfDeleting = user._id === memberId;
    const isOwnerAndSelfDeleting = isOwner && isUserSelfDeleting;

    if (isOwnerAndSelfDeleting)
      return toast("The owner cannot delete themselves");

    if (!isOwner && !isUserSelfDeleting)
      return toast("Only owner can manage members");

    const deleted = await fetchDeleteShoppingListUser(
      shoppingList._id,
      memberId
    );

    if (!deleted) return toast("Unexpected error");

    if (!deleted.ok)
      return toast(deleted?.details?.details || "Unexpected error");

    setShoppingList((list) => {
      if (!list) return null;
      return {
        ...list,
        members: [...list.members.filter((member) => member._id !== memberId)],
      };
    });
    setShoppingListMultiple(null);

    if (isUserSelfDeleting) {
      navigate("/");
    }

    toast("Member deleted");
  };

  return (
    <UnorderedListOfRows.Item>
      <Box align="center" gap="10px">
        <Icon imgSrc={userImg} />
        <Box direction="column">
          <Username>{children}</Username>
          <Email>{email}</Email>
        </Box>
      </Box>
      {owner ? <Tag>Owner</Tag> : <DeleteButton onClick={handleDelete} />}
    </UnorderedListOfRows.Item>
  );
};

export default Member;
