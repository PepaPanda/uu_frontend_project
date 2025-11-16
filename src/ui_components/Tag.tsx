import styled from "styled-components";

const Div = styled.div<{ $bg: string }>`
  border-radius: 11px;
  background: ${({ $bg }) => $bg};
  color: white;
  padding: 3px 8px;
  box-sizing: border-box;
  text-transform: uppercase;
  font-size: small;
  width: max-content;
`;
const Tag = ({
  children,
  bg = "grey",
}: {
  children: React.ReactNode;
  bg?: string;
}) => {
  return <Div $bg={bg}>{children}</Div>;
};

export default Tag;
