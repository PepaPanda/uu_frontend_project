import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

//Sub
import Card from "./Card";

const Ul = styled.ul<{ $justify: string }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  justify-content: ${({ $justify }) => $justify};
`;

const UnorderedListOfCards = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ query: "(max-width:817px)" });

  return <Ul $justify={isMobile ? "center" : "normal"}>{children}</Ul>;
};

UnorderedListOfCards.Card = Card;
export default UnorderedListOfCards;
