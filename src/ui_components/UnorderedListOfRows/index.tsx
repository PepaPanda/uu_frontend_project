import styled from "styled-components";
import Item from "./Item";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UnorderedListOfRows = ({ children }: { children: React.ReactNode }) => {
  return <Ul>{children}</Ul>;
};

UnorderedListOfRows.Item = Item;
export default UnorderedListOfRows;
