import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const NavContainer = styled.div`
  background-color: #1971c2;
  display: flex;
  margin: 1rem;
  font-size: 32px;
  color: white;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  @media (max-width: 450px) {
    font-size:22px
  }

`;

export const LeftNav = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

export const RightNav = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  font-size: 24px;
  position:relative

`;

export const LinksContainer = styled.div`
  display: flex;

  @media (max-width: 745px) {
    position:absolute;
    flex-direction:column;
    right:-1.22rem;
    top:60px;
    background-color: #1971c2;
    padding:1rem;
    font-size:18px;
    display: ${(props) => (props.visible ? 'block' : 'none')};
  }
`;

export const SummarizerStyle = styled.div`
  margin-right: 1rem;
  @media (max-width: 745px) {
    margin-bottom:1rem
  }


`;

export const PortfolioStyle = styled.div`

`;

export const LinkStylesNav = styled(Link)`
  color: white;
  text-decoration: none;
`;

export const SvgImage = styled.div`
  img {
    // Add any additional styling for the image
    height:15px,
    width:15px
  }
`;

export const MenubarIcon = styled.div`
  display: none;
  cursor: pointer;

  img {
    width: 30px; // Adjust the size as needed
  }

  @media (max-width: 745px) {
    display: block;
  }
`;