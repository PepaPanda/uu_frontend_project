import logo from "./logo.png";
import styled from "styled-components";
import { Link } from "react-router";

const Img = styled.img`
  width: 40px;
`;

const WrapperLink = styled(Link)<React.ComponentProps<typeof Link>>`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const Heading = styled.h1`
  font-size: 1.3rem;
`;

const Logo = ({ children }: { children: React.ReactNode }) => {
  return (
    <WrapperLink to="/">
      <Img src={logo} />
      <Heading>{children}</Heading>
    </WrapperLink>
  );
};

export default Logo;
