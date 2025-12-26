import TextInput from "../../ui_components/TextInput";
import Box from "../../ui_components/Box";
import Gap from "../../ui_components/Gap";
import TextWithIcon from "../../ui_components/TextWithIcon";
import Button from "../../ui_components/Button";
import { NavLink } from "react-router";

//Languages
import { useLanguage } from "../../context/LanguageContext/useLanguage";
import { resolveTranslationString } from "../../helpers/resolveTranslationString";

import loginImg from "./login.png";

const Register = () => {
  const { language } = useLanguage();
  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      height="calc(100dvh - 200px)"
      padding="10px"
    >
      <h1>{resolveTranslationString("register", language)}</h1>
      <h2>Shared Shopping</h2>
      <Gap />
      <TextInput placeholder="email" type="email" />
      <Gap $height="5px" />
      <TextInput
        placeholder={resolveTranslationString("password", language)}
        type="password"
      />
      <Gap $height="5px" />
      <TextInput
        placeholder={resolveTranslationString("first name", language)}
      />
      <Gap $height="5px" />
      <TextInput
        placeholder={resolveTranslationString("last name", language)}
      />
      <Gap />
      <Button>{resolveTranslationString("register now!", language)}</Button>
      <Gap />
      <TextWithIcon imgSrc={loginImg}>
        {resolveTranslationString("already have an account?", language)}{" "}
        <NavLink to="/login">
          <u>{resolveTranslationString("log in here", language)}</u>
        </NavLink>
      </TextWithIcon>
    </Box>
  );
};

export default Register;
