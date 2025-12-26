import styled from "styled-components";

const FooterEl = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  min-height: 80px;
  border: 2px solid black;
  margin-top: auto;

  @media (max-width: 841px) {
    flex-direction: column;
    padding: 20px 20px;
    gap: 10px;
  }
`;

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <FooterEl>{children}</FooterEl>;
};

import Links from "./Links";
import Socials from "./Socials";

Footer.Links = Links;
Footer.Socials = Socials;

export default Footer;
