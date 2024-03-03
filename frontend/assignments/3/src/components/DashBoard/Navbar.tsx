import { useState } from "react";
import stockLogo from "../../assets/stocklogo.svg"
import { LeftNav, LinkStylesNav, LinksContainer, MenubarIcon, NavContainer, PortfolioStyle, RightNav, SummarizerStyle, SvgImage } from '../../styles/navbar.style'
import { Link } from 'react-router-dom'

function Navbar() {

    const [linksVisible, setLinksVisible] = useState(false);

  const toggleLinksVisibility = () => {
    setLinksVisible(!linksVisible);
  };
    return (
      <NavContainer>
        <LeftNav>
          <Link to="/">
            <SvgImage>
              <img src={stockLogo} alt="stock-logo" />
            </SvgImage>
          </Link>
          <div className="kdu-heading">KDU Stock Market</div>
        </LeftNav>
        <RightNav>
        <LinksContainer visible={linksVisible}>
          <LinkStylesNav to="/summarizer">
            <SummarizerStyle>Summarizer</SummarizerStyle>
          </LinkStylesNav>
          <LinkStylesNav to="/myportfolio">
            <PortfolioStyle>My Portfolio</PortfolioStyle>
          </LinkStylesNav>
        </LinksContainer>
          <MenubarIcon onClick={toggleLinksVisibility}>
          <img src={"../src/assets/whitemenu.png"} alt="menu"/>
        </MenubarIcon>
        </RightNav>
      </NavContainer>
    );
  }

export default Navbar