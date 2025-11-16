import Gap from "../../ui_components/Gap";
import TextInput from "../../ui_components/TextInput";
import Button from "../../ui_components/Button";
import Box from "../../ui_components/Box";

import { useShoppingList } from "../../context/ShoppingList/useShoppingList";
import { useState } from "react";

import { toast } from "react-toastify";

import { nanoid } from "nanoid";

import { useUser } from "../../context/UserContext/useUser";

const InviteMember = () => {
  const { user } = useUser();

  const { shoppingList, setShoppingList } = useShoppingList();
  const [currentEmailToAdd, setCurrentEmailToAdd] = useState<string | null>(
    null,
  );

  const handleAddMemberSubmit = () => {
    //Make a fetch req. when api is available before setting new list
    if (!currentEmailToAdd) return toast("cannot do with empty email");

    if (user?.id !== shoppingList?.owner.id)
      return toast("Only owner can invite");

    setShoppingList((list) => {
      if (!list) return null;

      return {
        ...list,
        members: [
          ...list.members,
          {
            id: nanoid(),
            email: currentEmailToAdd,
            name: "some name from the DB",
          },
        ],
      };
    });

    setCurrentEmailToAdd(null);
  };

  const handleChangeAddEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email) return setCurrentEmailToAdd(email);
    setCurrentEmailToAdd(null);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddMemberSubmit();
      }}
    >
      <Box direction="column">
        <h3>Invite New members</h3>
        <Gap $height="7px" />
        <Box gap="20px">
          <TextInput
            placeholder="yourname@example.com"
            onChange={handleChangeAddEmail}
            type="email"
          />
          <Button styleType="dark">Add member</Button>
        </Box>
      </Box>
    </form>
  );
};

export default InviteMember;
