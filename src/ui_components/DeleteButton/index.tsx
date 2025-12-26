import styled from "styled-components";
import trashImg from "./trash.png";

import { useTheme } from "../../context/ThemeContext/useTheme";

const Button = styled.button<{ $theme: string }>`
  background: none;
  height: 2rem;
  width: 2rem;
  margin-left: auto;
  cursor: pointer;
  border: none;
  filter: ${({ $theme }) => ($theme === "light" ? "invert(0)" : "invert(1)")};
  &:hover {
    background: ${({ $theme }) => ($theme === "light" ? "cyan" : "#ff3a3a")};
    border-radius: 10px;
    filter: ${({ $theme }) => ($theme === "light" ? "invert(1)" : "invert(0)")};
  }
`;

type Props = React.ComponentProps<"button">;

export const DeleteButton = ({ ...rest }: Props) => {
  const { theme } = useTheme();

  return (
    <Button {...rest} $theme={theme || "light"}>
      <img src={trashImg} style={{ width: "1.1rem" }} />
    </Button>
  );
};
