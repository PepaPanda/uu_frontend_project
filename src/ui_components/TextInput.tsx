import styled from "styled-components";
import { nanoid } from "nanoid/non-secure";

const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  min-height: 30px;
`;

const TextInput = ({ ...rest }) => {
  return <Input type="text" id={nanoid()} {...rest} />;
};

export default TextInput;
