import Box from "../../ui_components/Box";
import Gap from "../../ui_components/Gap";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Box
      height="calc(100dvh - 100px)"
      direction="column"
      justify="center"
      align="center"
    >
      <h1>Page Not Found</h1>
      <Gap $height="5px" />
      <p>Sorry, the page you are looking for could not be found.</p>
      <Gap />
      <Link to="/">
        <u>Go to homepage</u>
      </Link>
    </Box>
  );
};

export default NotFound;
