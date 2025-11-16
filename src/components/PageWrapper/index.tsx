import styled from "styled-components";

const Div = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Div>{children}</Div>;
};

export default PageWrapper;
