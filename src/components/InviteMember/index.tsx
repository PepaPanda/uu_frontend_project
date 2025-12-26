import Gap from "../../ui_components/Gap";
import TextInput from "../../ui_components/TextInput";
import Button from "../../ui_components/Button";
import Box from "../../ui_components/Box";

import { useShoppingList } from "../../context/ShoppingList/useShoppingList";
import { useState } from "react";

import { toast } from "react-toastify";

import { useUser } from "../../context/UserContext/useUser";

import { fetchInviteShoppingListUser } from "../../helpers/fetchInviteShoppingListUser";

//Languages
import { useLanguage } from "../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../helpers/resolveTranslationString";

const InviteMember = () => {
  const { language } = useLanguage();

  const { user } = useUser();

  const { shoppingList } = useShoppingList();
  const [currentEmailToAdd, setCurrentEmailToAdd] = useState<string | null>(
    null
  );

  const handleAddMemberSubmit = async () => {
    if (!shoppingList || !user)
      return toast(
        resolveTranslationString(
          "an unexpected error occured, try reloading the page",
          language
        )
      );

    //Make a fetch req. when api is available before setting new list
    if (!currentEmailToAdd)
      return toast(
        resolveTranslationString("you cannot add an empty value", language)
      );
    if (user._id !== shoppingList.owner._id)
      return toast(resolveTranslationString("only owner can invite", language));

    const result = await fetchInviteShoppingListUser(
      shoppingList._id,
      currentEmailToAdd
    );

    if (!result)
      return toast(
        resolveTranslationString("unexpected error occured", language)
      );

    if (!result.ok)
      return toast(
        result?.details?.details ||
          resolveTranslationString("unexpected error occured", language)
      );

    toast(
      resolveTranslationString(
        "member invited. They can now join (if they accept)",
        language
      )
    );

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
        <h3>{resolveTranslationString("invite new members", language)}</h3>
        <Gap $height="7px" />
        <Box gap="20px">
          <TextInput
            placeholder={resolveTranslationString("email_example", language)}
            onChange={handleChangeAddEmail}
            type="email"
            value={currentEmailToAdd || ""}
          />
          <Button styleType="dark">
            {resolveTranslationString("invite a member", language)}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default InviteMember;
