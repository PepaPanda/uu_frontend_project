//Hooks
import { useShoppingList } from "../../../context/ShoppingList/useShoppingList";
import { useEffect } from "react";
import { useParams } from "react-router";

//Helpers
import { fetchShoppingList } from "../../../helpers/fetchShoppingList";
import { toast } from "react-toastify";

//Components
import InviteMember from "../../../components/InviteMember";
import Gap from "../../../ui_components/Gap";
import ListMembers from "../../../components/ListMembers";

//Languages
import { useLanguage } from "../../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../../helpers/resolveTranslationString";

const Members = () => {
  const { language } = useLanguage();

  const { id } = useParams();
  const { shoppingList, setShoppingList } = useShoppingList();

  useEffect(() => {
    if (!id) return;
    if (!shoppingList) {
      (async () => {
        const shoppingList = await fetchShoppingList(id);
        if (!shoppingList)
          return toast(
            resolveTranslationString("failed to fetch shopping list", language)
          );
        setShoppingList(shoppingList);
      })();
    }
  }, [shoppingList, setShoppingList, id]);

  const renderUserList = () => {
    if (!shoppingList) return <></>;
    const owner = shoppingList.owner;
    const members = shoppingList.members.filter(
      (member) => member._id !== owner._id
    );

    return (
      <ListMembers>
        <ListMembers.Member
          email={owner.email}
          key={owner._id}
          memberId={owner._id}
          owner={true}
        >
          {owner.name}
        </ListMembers.Member>
        {members.map((member) => {
          return (
            <ListMembers.Member
              email={member.email}
              key={member._id}
              memberId={member._id}
            >
              {member.name}
            </ListMembers.Member>
          );
        })}
      </ListMembers>
    );
  };

  return (
    <>
      <h1>
        {shoppingList
          ? `${resolveTranslationString("manage members for", language)}: ${
              shoppingList.name
            }`
          : resolveTranslationString("failed to fetch shopping list", language)}
      </h1>
      <Gap />
      <InviteMember />
      <Gap />
      {renderUserList()}
    </>
  );
};

export default Members;
