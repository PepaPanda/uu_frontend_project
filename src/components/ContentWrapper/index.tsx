import styled from "styled-components";

const Main = styled.main`
  flex: 1;
  padding-bottom: 50px;
`;

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Main>{children}</Main>;
};

export default ContentWrapper;
