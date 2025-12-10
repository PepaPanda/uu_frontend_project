import Gap from "../../ui_components/Gap";
import TextInput from "../../ui_components/TextInput";
import Button from "../../ui_components/Button";
import Box from "../../ui_components/Box";

import { useShoppingList } from "../../context/ShoppingList/useShoppingList";
import { useState } from "react";

import { toast } from "react-toastify";

import { useUser } from "../../context/UserContext/useUser";

import { fetchInviteShoppingListUser } from "../../helpers/fetchInviteShoppingListUser";

const InviteMember = () => {
  const { user } = useUser();

  const { shoppingList } = useShoppingList();
  const [currentEmailToAdd, setCurrentEmailToAdd] = useState<string | null>(
    null
  );

  const handleAddMemberSubmit = async () => {
    if (!shoppingList || !user)
      return toast("Unexpected error - try reloading the page");

    //Make a fetch req. when api is available before setting new list
    if (!currentEmailToAdd) return toast("cannot do with empty email");
    if (user._id !== shoppingList.owner._id)
      return toast("Only owner can invite");

    const result = await fetchInviteShoppingListUser(
      shoppingList._id,
      currentEmailToAdd
    );

    if (!result) return toast("Unexpected error");

    if (!result.ok)
      return toast(result?.details?.details || "Unexpected error");

    toast("Member invited. They can now join (if they accept)");

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
            value={currentEmailToAdd || ""}
          />
          <Button styleType="dark">Invite a member</Button>
        </Box>
      </Box>
    </form>
  );
};

export default InviteMember;
