import styled from "styled-components";

const Li = styled.li`
  margin: 0;
  color: #2d2d2d;
`;
const Item = ({ children }: { children: React.ReactNode }) => {
  return <Li>{children}</Li>;
};

export default Item;
