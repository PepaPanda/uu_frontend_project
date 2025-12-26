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

//Languages
import { useLanguage } from "../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../helpers/resolveTranslationString";

const Login = () => {
  const { language } = useLanguage();

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
        return toast(
          resolveTranslationString(
            "please fill in the email and password",
            language
          )
        );

      if (!validateEmail(email))
        return toast(
          resolveTranslationString(
            "the e-mail is in incorrect format",
            language
          )
        );

      const loginRes = await loginUser(email, password); //Throws err on fail
      if (loginRes.ok) return navigate("/");

      if (!(loginRes.statusCode >= 500)) {
        return toast(
          resolveTranslationString("incorrect email or password", language)
        );
      }

      return toast(
        resolveTranslationString(
          "an error occured while trying to log in, please report this issue",
          language
        )
      );
    } catch (error) {
      console.error(error);
      toast(
        resolveTranslationString(
          "an error occured while trying to log in, please report this issue",
          language
        )
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
      <h1>{resolveTranslationString("log in", language)}</h1>
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
        placeholder={resolveTranslationString("password", language)}
        type="password"
        value={loginData.password || ""}
        onChange={handleLoginDataChange}
        name="password"
      />
      <Gap $height="5px" />
      <Button onClick={handleLoginSubmit}>
        {resolveTranslationString("submit login", language)}
      </Button>
      <Gap />
      <TextWithIcon imgSrc={registerImg}>
        {resolveTranslationString("don't have an account yet?", language)}{" "}
        <NavLink to="/register">
          <u>{resolveTranslationString("register here!", language)}</u>
        </NavLink>
      </TextWithIcon>
    </Box>
  );
};

export default Login;
