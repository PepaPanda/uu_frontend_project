import styled from "styled-components";

import { useTheme } from "../context/ThemeContext/useTheme";

const Img = styled.img<{ $theme: string }>`
  height: 1.8rem;
  witdh: 1.8rem;
  ${({ $theme }) => $theme === "dark" && "filter:invert(1);"}
`;

const Icon = ({ imgSrc }: { imgSrc: string }) => {
  const { theme } = useTheme();

  return <Img src={imgSrc} $theme={theme || "light"} />;
};

export default Icon;
