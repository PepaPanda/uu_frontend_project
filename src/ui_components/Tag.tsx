import styled from "styled-components";

const Div = styled.div<{ $bg: string; $color: string }>`
  border-radius: 11px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  padding: 3px 8px;
  box-sizing: border-box;
  text-transform: uppercase;
  font-size: small;
  width: max-content;
`;
const Tag = ({
  children,
  bg = "grey",
  color = "white",
}: {
  children: React.ReactNode;
  bg?: string;
  color?: string;
}) => {
  return (
    <Div $bg={bg} $color={color}>
      {children}
    </Div>
  );
};

export default Tag;
