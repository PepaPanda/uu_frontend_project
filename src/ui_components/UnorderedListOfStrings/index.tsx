import styled from "styled-components";
import Item from "./Item";

const Ul = styled.ul<{ $vertical: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  gap: 12px;
`;

const UnorderedListOfStrings = ({
  children,
  vertical = true,
}: {
  children: React.ReactNode;
  vertical?: boolean;
}) => {
  return <Ul $vertical={vertical}>{children}</Ul>;
};

UnorderedListOfStrings.Item = Item;
export default UnorderedListOfStrings;
