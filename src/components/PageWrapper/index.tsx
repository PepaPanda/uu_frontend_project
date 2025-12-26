import styled from "styled-components";

import { useTheme } from "../../context/ThemeContext/useTheme";

const Div = styled.div<{ $theme: string }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ $theme }) => ($theme === "light" ? "#f3f3f3ff" : "#252525")};
  color: ${({ $theme }) => ($theme === "light" ? "inherit" : "#e8e8e8ff")};
`;

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return <Div $theme={theme || "light"}>{children}</Div>;
};

export default PageWrapper;
