//Hooks
import { useParams } from "react-router";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

//Helpers
import { fetchShoppingList } from "../../helpers/fetchShoppingList";
import { toast } from "react-toastify";

//Context
import { useShoppingList } from "../../context/ShoppingList/useShoppingList";

//Components
import Gap from "../../ui_components/Gap";
import Box from "../../ui_components/Box";
import ShoppingListBtn from "../../components/ShoppingListBtn";
import ShoppingListInfo from "../../components/ShoppingListInfo";
import Divider from "../../ui_components/Divider";
import ShoppingListForm from "../../components/ShoppingListForm";

//Subpages
export { default as Members } from "./Members";
export { default as Settings } from "./Settings";

//Language
import { useLanguage } from "../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../helpers/resolveTranslationString";

const ShoppingListDetail = () => {
  const { language } = useLanguage();

  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });

  const { id } = useParams();
  const { shoppingList, setShoppingList } = useShoppingList();

  useEffect(() => {
    if (!id) return;
    if (shoppingList?._id === id) return;

    (async () => {
      const list = await fetchShoppingList(id);
      if (!list)
        return toast(
          resolveTranslationString("failed to get shopping list", language)
        );
      setShoppingList(list);
    })();
  }, [id, setShoppingList, shoppingList]);

  return (
    <>
      <Box
        justify="space-between"
        direction={`${isMobile ? "column" : "row"}`}
        gap="10px"
      >
        <ShoppingListInfo>
          <ShoppingListInfo.Name>{shoppingList?.name}</ShoppingListInfo.Name>
          <Gap $height={`${isMobile ? "30px" : "12px"}`} />
          <ShoppingListInfo.AdditionalInfo>
            <ShoppingListInfo.AdditionalInfo.Owner>
              {shoppingList?.owner.name}
            </ShoppingListInfo.AdditionalInfo.Owner>
            <ShoppingListInfo.AdditionalInfo.Members>
              {shoppingList?.members.length}{" "}
              {resolveTranslationString("active members", language)}
            </ShoppingListInfo.AdditionalInfo.Members>
            <ShoppingListInfo.AdditionalInfo.Status>
              {resolveTranslationString(
                shoppingList?.status || "---",
                language
              )}
            </ShoppingListInfo.AdditionalInfo.Status>
          </ShoppingListInfo.AdditionalInfo>
        </ShoppingListInfo>
        {isMobile && <Gap $height="10px" />}
        <ShoppingListBtn />
      </Box>
      <Gap />
      <Divider />
      <Gap />
      <ShoppingListForm />
    </>
  );
};

export default ShoppingListDetail;
