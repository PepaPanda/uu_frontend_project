import styled from "styled-components";

import { useTheme } from "../../../context/ThemeContext/useTheme";

export const Li = styled.li<{ $clickable: boolean; $theme: string }>`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "auto")};
  border: 1px solid black;
  justify-content: space-between;
  &:hover {
    background: ${({ $theme }) =>
      $theme === "light" ? "#ffffffff" : "#2d2d2d;"};
  }
`;

type Props = React.ComponentProps<"li"> & {
  children: React.ReactNode;
  clickable?: boolean;
};

const Item = ({ children, clickable = true, ...rest }: Props) => {
  const { theme } = useTheme();
  return (
    <Li $clickable={clickable} $theme={theme || "light"} {...rest}>
      {children}
    </Li>
  );
};

export default Item;
