import TextInput from "../../ui_components/TextInput";
import Box from "../../ui_components/Box";
import Gap from "../../ui_components/Gap";
import TextWithIcon from "../../ui_components/TextWithIcon";
import Button from "../../ui_components/Button";
import { NavLink } from "react-router";

import loginImg from "./login.png";

const Register = () => {
  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      height="calc(100dvh - 200px)"
      padding="10px"
    >
      <h1>Register</h1>
      <h2>Shared Shopping</h2>
      <Gap />
      <TextInput placeholder="email" type="email" />
      <Gap $height="5px" />
      <TextInput placeholder="password" type="password" />
      <Gap $height="5px" />
      <TextInput placeholder="first name" />
      <Gap $height="5px" />
      <TextInput placeholder="last name" />
      <Gap />
      <Button>Register now!</Button>
      <Gap />
      <TextWithIcon imgSrc={loginImg}>
        Already have an acoount?{" "}
        <NavLink to="/login">
          <u>Log in here</u>
        </NavLink>
      </TextWithIcon>
    </Box>
  );
};

export default Register;
