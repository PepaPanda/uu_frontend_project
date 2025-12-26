import styled from "styled-components";
import { useNavigate } from "react-router";

import { useTheme } from "../../../context/ThemeContext/useTheme";

export const Li = styled.li<{
  $border?: boolean;
  $color?: string;
  $theme: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 150px;
  width: 300px;
  cursor: pointer;
  border: ${({ $border }) => ($border ? "1px solid grey" : "none")};
  color: ${({ $color }) => $color};
  &:hover {
    background: ${({ $theme }) =>
      $theme === "light" ? "#ffffffff" : "#2d2d2d;"};
  }
`;

const Highlight = styled.div`
  background: #38bdff9c;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
`;

const Card = ({
  link = null,
  border = true,
  color = "inherit",
  highlight = false,
  children,
}: {
  link?: string | null;
  border?: boolean;
  color?: string;
  highlight?: boolean;
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const handleClick = () => {
    if (!link) return;
    navigate(link);
  };

  return (
    <>
      <Li
        $border={border}
        $color={color}
        onClick={handleClick}
        $theme={theme || "light"}
      >
        {highlight && <Highlight />}
        {children}
      </Li>
    </>
  );
};

export default Card;
