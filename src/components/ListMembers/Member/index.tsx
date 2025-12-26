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

//Languages
import { useLanguage } from "../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../helpers/resolveTranslationString";

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
  const { language } = useLanguage();

  const { shoppingList, setShoppingList } = useShoppingList();
  const { setShoppingListMultiple } = useShoppingListMultiple();
  const { user } = useUser();

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!shoppingList || !user)
      return toast(
        resolveTranslationString(
          "an unexpected error occured, try reloading the page",
          language
        )
      );

    const isOwner = user._id === shoppingList.owner._id;
    const isUserSelfDeleting = user._id === memberId;
    const isOwnerAndSelfDeleting = isOwner && isUserSelfDeleting;

    if (isOwnerAndSelfDeleting)
      return toast(
        resolveTranslationString("the owner cannot delete themselves", language)
      );

    if (!isOwner && !isUserSelfDeleting)
      return toast(
        resolveTranslationString("only owner can manage members", language)
      );

    const deleted = await fetchDeleteShoppingListUser(
      shoppingList._id,
      memberId
    );

    if (!deleted)
      return toast(resolveTranslationString("unexpected error", language));

    if (!deleted.ok)
      return toast(
        deleted?.details?.details ||
          resolveTranslationString("unexpected error", language)
      );

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

    toast(resolveTranslationString("member removed", language));
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
      {owner ? (
        <Tag>{resolveTranslationString("owner", language)}</Tag>
      ) : (
        <DeleteButton onClick={handleDelete} />
      )}
    </UnorderedListOfRows.Item>
  );
};

export default Member;
