import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentWrapper from "../components/ContentWrapper";
import PageWrapper from "../components/PageWrapper";
import MobileBurgerMenu from "../components/Header/MobileBurgerMenu";
import Box from "../ui_components/Box";
import Gap from "../ui_components/Gap";

import { useMediaQuery } from "react-responsive";

//Images
import instagramImg from "./images/instagram.png";
import linkedinImg from "./images/linkedin.png";
import xImg from "./images/x.png";

const items = [
  { to: "/", label: "Active lists" },
  { to: "/archived", label: "Archived lists" },
  { to: "/logout", label: "Log out" },
  { to: "/user/settings", label: "Account settings" },
  { to: "/shopping-list/1234", label: "TEST LIST DETAIL - HOMEWORK" },
];

const AppTemplate = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });

  return (
    <PageWrapper>
      <Header>
        {!isMobile ? (
          <>
            <Header.Logo>Shared shopping</Header.Logo>
            <Header.Menu>
              <Header.Menu.Item link="/">Active Lists</Header.Menu.Item>
              <Header.Menu.Item link="/archived">
                Archived Lists
              </Header.Menu.Item>
            </Header.Menu>
            <Header.UserInfo>
              <Header.BackBtn />
              <Header.UserInfo.LogoutBtn />
              <Header.UserInfo.UserSettingsIcon />
            </Header.UserInfo>
          </>
        ) : (
          <>
            <Header.Logo>Shared shopping</Header.Logo>
            <MobileBurgerMenu items={items} />
          </>
        )}
      </Header>

      <ContentWrapper>
        <Gap />
        <Box direction="column" padding="40px">
          <Outlet />
        </Box>
      </ContentWrapper>
      <Footer>
        <Footer.Links>
          <Footer.Links.Link target="/about">About</Footer.Links.Link>
          <Footer.Links.Link target="/contact">Contact</Footer.Links.Link>
          <Footer.Links.Link target="/donate">Donate</Footer.Links.Link>
        </Footer.Links>
        <Footer.Socials>
          <Footer.Socials.Social
            imgSrc={instagramImg}
            url="https://www.instagram.com/"
          />
          <Footer.Socials.Social imgSrc={xImg} url="https://x.com/" />
          <Footer.Socials.Social
            imgSrc={linkedinImg}
            url="https://cz.linkedin.com/"
          />
        </Footer.Socials>
      </Footer>
    </PageWrapper>
  );
};

export default AppTemplate;
