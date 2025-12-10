//Components
import TextInput from "../../ui_components/TextInput";
import Box from "../../ui_components/Box";
import Gap from "../../ui_components/Gap";
import TextWithIcon from "../../ui_components/TextWithIcon";
import { NavLink, useNavigate } from "react-router";
import Button from "../../ui_components/Button";

//Img
import registerImg from "./register.png";

//Hooks
import { useState } from "react";
import { toast } from "react-toastify";

//Helpers
import { loginUser, validateEmail } from "../../helpers/loginUser";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((loginData) => {
      return {
        ...loginData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLoginSubmit = async () => {
    const { email, password } = loginData;
    try {
      if (email.length === 0 || password.length === 0)
        return toast("Please fill in the email and password");

      if (!validateEmail(email))
        return toast("The e-mail is in incorrect format");

      const loginRes = await loginUser(email, password); //Throws err on fail
      if (loginRes.ok) return navigate("/");

      if (!(loginRes.statusCode >= 500)) {
        return toast("Incorrect email or password");
      }

      return toast(
        "An error occured while trying to log in, please report this issue"
      );
    } catch (error) {
      console.error(error);
      toast(
        "An error occured while trying to log in, please report this issue"
      );
    }
  };

  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      height="calc(100dvh - 200px)"
      padding="10px"
    >
      <h1>Log in</h1>
      <h2>Shared Shopping</h2>
      <Gap />
      <TextInput
        placeholder="email"
        type="email"
        value={loginData.email || ""}
        onChange={handleLoginDataChange}
        name="email"
      />
      <Gap $height="5px" />
      <TextInput
        placeholder="password"
        type="password"
        value={loginData.password || ""}
        onChange={handleLoginDataChange}
        name="password"
      />
      <Gap $height="5px" />
      <Button onClick={handleLoginSubmit}>Submit login</Button>
      <Gap />
      <TextWithIcon imgSrc={registerImg}>
        Don't have an account yet?{" "}
        <NavLink to="/register">
          <u>Register here!</u>
        </NavLink>
      </TextWithIcon>
    </Box>
  );
};

export default Login;
