import Box from "../../ui_components/Box";
import Button from "../../ui_components/Button";
import { useNavigate, useLocation } from "react-router";

const ShoppingListBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box gap="20px">
      <Button onClick={() => navigate(`${location.pathname}/members`)}>
        Members
      </Button>
      <Button onClick={() => navigate(`${location.pathname}/settings`)}>
        Settings
      </Button>
    </Box>
  );
};

export default ShoppingListBtn;
