import styled from "styled-components";

import { useTheme } from "../context/ThemeContext/useTheme";

const Btn = styled.button<{ $type: string }>`
  width: max-content;
  height: 43px;
  border: 2px solid ${({ $type }) => ($type === "light" ? "black" : "#868686")};
  padding: 10px 20px;
  background: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  ${({ $type }) => {
    if ($type === "light") {
      return `
        color: black;
        background:white;
        &:hover {
          background: black;
          color:white;
        };
        &:hover ${Img} {
          filter: invert(1);
        };
      `;
    } else if ($type === "dark") {
      return `
        color: white;
        background:black;
        & ${Img} {
          filter: invert(1);
        };
        &:hover ${Img} {
          filter: invert(0);
        };
        &:hover {
          background: white;
          color:black;
        }
      `;
    }
  }}
`;

const Img = styled.img<{ $type: string }>`
  max-height: 20px;
`;

type ButtonProps = {
  children: React.ReactNode;
  imgSrc?: string;
  styleType?: "light" | "dark";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  imgSrc,
  styleType = "light",
  ...rest
}: ButtonProps) => {
  const { theme } = useTheme();

  if (theme === "dark") {
    styleType = styleType === "light" ? "dark" : "light";
  }

  return (
    <Btn $type={styleType} {...rest}>
      {imgSrc && <Img src={imgSrc} $type={styleType} />}
      {children}
    </Btn>
  );
};

export default Button;
