import styled from "styled-components";
import { nanoid } from "nanoid/non-secure";

import { useMediaQuery } from "react-responsive";

import { useTheme } from "../context/ThemeContext/useTheme";

const Input = styled.input<{ $width: string; $theme: string }>`
  padding: 0 10px;
  width: ${({ $width }) => $width};
  min-height: 45px;
  background: ${({ $theme }) => ($theme === "light" ? "#ffffff" : "#434343ff")};
  color: ${({ $theme }) => ($theme === "light" ? "inherit" : "white")};
  border: ${({ $theme }) =>
    $theme === "light" ? "2px solid black" : "2px solid white"};
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
  const { theme } = useTheme();

  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });

  const appliedWidth = isMobile ? "100%" : width;

  return (
    <Input
      id={nanoid()}
      $width={appliedWidth}
      placeholder={placeholder}
      type="text"
      $theme={theme || "light"}
      {...rest}
    />
  );
};

export default TextInput;
