import styled from "styled-components";

const Div = styled.div<{
  $direction: string;
  $align: string;
  $justify: string;
  $gap: string;
  $padding: string;
  $bg: string;
  $height: string;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  gap: ${({ $gap }) => $gap};
  padding: 0 ${({ $padding }) => $padding};
  background: ${({ $bg }) => $bg};
  height: ${({ $height }) => $height};
`;

const Box = ({
  children,
  direction = "row",
  align = "normal",
  justify = "normal",
  gap = "0",
  padding = "0",
  bg = "none",
  height = "unset",
}: {
  children: React.ReactNode;
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
  padding?: string;
  bg?: string;
  height?: string;
}) => {
  return (
    <Div
      $direction={direction}
      $align={align}
      $justify={justify}
      $gap={gap}
      $padding={padding}
      $bg={bg}
      $height={height}
    >
      {children}
    </Div>
  );
};

export default Box;
