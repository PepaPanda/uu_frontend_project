import styled from "styled-components";

export const Li = styled.li<{ $clickable: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "auto")};
  border: 1px solid black;
  justify-content: space-between;
  &:hover {
    background: #eaeaea;
  }
`;

type Props = React.ComponentProps<"li"> & {
  children: React.ReactNode;
  clickable?: boolean;
};

const Item = ({ children, clickable = true, ...rest }: Props) => {
  return (
    <Li $clickable={clickable} {...rest}>
      {children}
    </Li>
  );
};

export default Item;
