//Hooks
import { Routes, Route } from "react-router";

//Pages
import AppTemplate from "./templates/AppTemplate";
import NotFound from "./pages/NotFound";
import ShoppingListDetail, {
  Members,
  Settings,
} from "./pages/ShoppingListDetail";

//Context
import { ShoppingListProvider } from "./context/ShoppingList/ShoppingListProvider";

//Alerts
import { ToastContainer } from "react-toastify";

const Router = () => {
  return (
    <ShoppingListProvider>
      <ToastContainer />
      <Routes>
        <Route element={<AppTemplate />}>
          <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
          <Route path="/shopping-list/:id/settings" element={<Settings />} />
          <Route path="/shopping-list/:id/members" element={<Members />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ShoppingListProvider>
  );
};

export default Router;
