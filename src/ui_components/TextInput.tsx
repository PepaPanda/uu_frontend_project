import styled from "styled-components";
import { nanoid } from "nanoid/non-secure";

import { useMediaQuery } from "react-responsive";

const Input = styled.input<{ $width: string }>`
  padding: 0 10px;
  width: ${({ $width }) => $width};
  min-height: 45px;
`;

type TextInputProps = {
  width?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({
  width = "333px",
  placeholder = "",
  ...rest
}: TextInputProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });

  const appliedWidth = isMobile ? "100%" : width;

  return (
    <Input
      type="text"
      id={nanoid()}
      {...rest}
      $width={appliedWidth}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
