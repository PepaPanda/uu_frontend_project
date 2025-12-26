import styled from "styled-components";

import { useTheme } from "../../../context/ThemeContext/useTheme";

const Li = styled.li<{ $theme: string }>`
  margin: 0;
  color: ${({ $theme }) => ($theme === "light" ? "#2d2d2d;" : "#e8e8e8ff")};
`;
const Item = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return <Li $theme={theme || "light"}>{children}</Li>;
};

export default Item;
