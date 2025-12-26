import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContentWrapper from "../components/ContentWrapper";
import PageWrapper from "../components/PageWrapper";
import MobileBurgerMenu from "../components/Header/MobileBurgerMenu";
import Box from "../ui_components/Box";
import Gap from "../ui_components/Gap";

import { useMediaQuery } from "react-responsive";
import { resolveTranslationString } from "../helpers/resolveTranslationString";

import { useLanguage } from "../context/LanguageContext/useLanguage";

//Images
import instagramImg from "./images/instagram.png";
import linkedinImg from "./images/linkedin.png";
import xImg from "./images/x.png";

const AppTemplate = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 817px)" });

  const { language } = useLanguage();

  const items = [
    { to: "/", label: resolveTranslationString("active lists", language) },
    {
      to: "/archived",
      label: resolveTranslationString("archived lists", language),
    },
    { to: "/stats", label: resolveTranslationString("statistics", language) },
    { to: "/logout", label: resolveTranslationString("log out", language) },
    {
      to: "/user/settings",
      label: resolveTranslationString("account settings", language),
    },
  ];

  return (
    <PageWrapper>
      <Header>
        {!isMobile ? (
          <>
            <Header.Logo>Shared shopping</Header.Logo>
            <Header.Menu>
              <Header.Menu.Item link="/">
                {resolveTranslationString("active lists", language)}
              </Header.Menu.Item>
              <Header.Menu.Item link="/archived">
                {resolveTranslationString("archived lists", language)}
              </Header.Menu.Item>
              <Header.Menu.Item link="/stats">
                {resolveTranslationString("statistics", language)}
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
          <Footer.Links.Link target="/about">
            {resolveTranslationString("about", language)}
          </Footer.Links.Link>
          <Footer.Links.Link target="/contact">
            {" "}
            {resolveTranslationString("contact", language)}
          </Footer.Links.Link>
          <Footer.Links.Link target="/donate">
            {" "}
            {resolveTranslationString("donate", language)}
          </Footer.Links.Link>
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
