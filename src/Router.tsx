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
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserSettings from "./pages/UserSettings";

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<AppTemplate />}>
              <Route
                path="/shopping-list/:id"
                element={<ShoppingListDetail />}
              />
              <Route
                path="/shopping-list/:id/settings"
                element={<Settings />}
              />
              <Route path="/shopping-list/:id/members" element={<Members />} />
              <Route path="/" element={<ActiveLists />} />
              <Route path="/archived" element={<ArchivedLists />} />

              <Route path="/user/settings" element={<UserSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ShoppingListMultipleProvider>
      </ShoppingListProvider>
    </UserProvider>
  );
};

export default Router;
