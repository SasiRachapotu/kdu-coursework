// Define styled components
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
export const StockDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem;
  border-bottom: 2px solid gray;
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

export const PriceWatchlist = styled.div`
  display: flex;
  align-items: center;
  width: 190px;
  min-width: fit-content;

  @media (max-width: 450px) {
    flex:0.75
  }
`;

export const BasePrice = styled.div`
  flex: 1;
  text-align:center
`;

export const AddStockButton = styled.button`
  flex: 1;
  background-color: white;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
  }
  
`;
export const CrossImage = styled.img`
  width: 22px;
  height: 22px;
`;

export const TickImage = styled.img`
  width: 22px;
  height: 22px;

//   &:hover{
//     display:none;
//   }
  
//   &:hover + ${CrossImage}{
//       display:block; /* Show the cross image on hover */
//   }
`;


export const AddStockImage = styled.img`
  /* Add any specific styles for the add stock image here */
  width: 22px;
  height: 22px;
`;

export const linkStylesItem:CSSProperties={
  color:"black",
  textDecoration:"none"
}

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  flex:1
`;
