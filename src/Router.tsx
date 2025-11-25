//Hooks
import { Routes, Route } from "react-router";

//Pages
import AppTemplate from "./templates/AppTemplate";
import NotFound from "./pages/NotFound";
import ShoppingListDetail, {
  Members,
  Settings,
} from "./pages/ShoppingListDetail";
import { ArchivedLists, ActiveLists } from "./pages/ShoppingListOverview";

//Context
import { ShoppingListProvider } from "./context/ShoppingList/ShoppingListProvider";
import { UserProvider } from "./context/UserContext/UserProvider";
import { ShoppingListMultipleProvider } from "./context/ShoppingListMultiple/ShoppingListMultipleProvider";

//Alerts
import { ToastContainer } from "react-toastify";

const Router = () => {
  return (
    <UserProvider>
      <ShoppingListProvider>
        <ShoppingListMultipleProvider>
          <ToastContainer />
          <Routes>
            <Route element={<AppTemplate />}>
              <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
              <Route path="/shopping-list/:id/settings" element={<Settings />} />
              <Route path="/shopping-list/:id/members" element={<Members />} />
              <Route path="/" element={<ActiveLists />}/>
              <Route path="/archived" element={<ArchivedLists/>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ShoppingListMultipleProvider>
      </ShoppingListProvider>
    </UserProvider>
  );
};

export default Router;
