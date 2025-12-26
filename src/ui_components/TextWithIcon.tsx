import styled from "styled-components";
import Box from "./Box";

import { useTheme } from "../context/ThemeContext/useTheme";

const Img = styled.img<{ $theme: string }>`
  height: 1.2rem;
  padding-right: 5px;
  ${({ $theme }) => $theme === "dark" && "filter:invert(1);"}
`;

const TextWithIcon = ({
  children,
  imgSrc,
}: {
  children: React.ReactNode;
  imgSrc: string;
}) => {
  const { theme } = useTheme();

  return (
    <Box>
      <Img src={imgSrc} $theme={theme || "light"} />
      <span>{children}</span>
    </Box>
  );
};

export default TextWithIcon;
