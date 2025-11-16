import styled from "styled-components";
const H2 = styled.h2`
  font-size: 2.1rem;
`;

const Name = ({ children }: { children: React.ReactNode }) => {
  return <H2>{children}</H2>;
};

export default Name;
