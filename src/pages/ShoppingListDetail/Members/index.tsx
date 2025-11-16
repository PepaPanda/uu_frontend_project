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

const Members = () => {
  const { id } = useParams();
  const { shoppingList, setShoppingList } = useShoppingList();

  useEffect(() => {
    if (shoppingList) return;
    if (!id) return;

    (async () => {
      const list = await fetchShoppingList(id);
      if (!list) return toast("failed to get shopping list");
      setShoppingList(list);
    })();
  }, [shoppingList, setShoppingList, id]);

  const renderUserList = () => {
    if (!shoppingList) return <></>;
    const owner = shoppingList.owner;
    const members = shoppingList.members.filter(
      (member) => member.id !== owner.id,
    );

    return (
      <ListMembers>
        <ListMembers.Member
          email={owner.email}
          key={owner.id}
          memberId={owner.id}
          owner={true}
        >
          {owner.name}
        </ListMembers.Member>
        {members.map((member) => {
          return (
            <ListMembers.Member
              email={member.email}
              key={member.id}
              memberId={member.id}
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
          ? `Manage members for ${shoppingList.name}`
          : "Failed to fetch shopping list"}
      </h1>
      <Gap />
      <InviteMember />
      <Gap />
      {renderUserList()}
    </>
  );
};

export default Members;
