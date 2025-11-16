import UnorderedListOfRows from "../../../ui_components/UnorderedListOfRows";
import { DeleteButton } from "../../../ui_components/DeleteButton";
import Icon from "../../../ui_components/Icon";
import Box from "../../../ui_components/Box";
import Tag from "../../../ui_components/Tag";

import { useShoppingList } from "../../../context/ShoppingList/useShoppingList";
import { useUser } from "../../../context/UserContext/useUser";

import userImg from "./user.png";

import styled from "styled-components";
import { toast } from "react-toastify";

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
  const { user } = useUser();

  const handleDelete = () => {
    if (user?.id !== shoppingList?.owner.id)
      return toast("Only owner can manage members");

    setShoppingList((list) => {
      if (!list) return null;
      return {
        ...list,
        members: [...list.members.filter((member) => member.id !== memberId)],
      };
    });
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
