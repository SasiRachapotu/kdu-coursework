import { CSSProperties } from "react";
import styled from 'styled-components';


export const filterContaierStyle:CSSProperties={
    fontSize:"22px",
    border:"2px solid black",
    margin:"1rem",
    borderRadius:"10px",
    width:"90%",
    backgroundColor:"#e9ecef"
}

export const filterHeaderStyle:CSSProperties={
    display:"flex",
    padding:"1rem",
    justifyContent:"space-between",
    borderBottom:"2px solid gray"
}

export const rightFilterHeaderStyles:CSSProperties={
    color:"#1971c2",
    fontSize:"22px",
    border:"none",
    backgroundColor:"#e9ecef"
}

export const searchContainerStyles:CSSProperties={
    display:"flex",
    alignItems:"center",
    margin:"1rem",
    border:"2px solid black",
    width:"90%",
    borderRadius:"10px",
}

export const searchImageStyles:CSSProperties={
    width:"22px",
    height:"22px",
    paddingLeft:"1rem"
}

export const searchInputStyles:CSSProperties={
    backgroundColor:"#e9ecef",
    border:"none",
    padding:"1rem",
    fontSize:"22px"
}

export const SearchInput = styled.input`
  background-color: #e9ecef;
  border: none;
  padding: 1rem;
  font-size: 22px;
  outline:none;
  &:focus {
    border: none;
  }
`;

export const dateContainerStyles:CSSProperties={
    borderTop:"2px solid gray",
    borderBottom:"2px solid gray",
}

export const dateStyles:CSSProperties={
    backgroundColor:"#e9ecef",
    padding:"1rem",
    margin:"1rem",
    borderRadius:"10px"
}

export const passedfailedStyles:CSSProperties={
    borderBottom:"2px solid gray"
}

export const passedStyles:CSSProperties={
    display:"flex",
    margin:"1rem",
    alignItems:"center"
}

export const checkBoxstyle:CSSProperties={
    height:"22px",
    width:"22px"
}

export const StockNamesContainer = styled.div`
  height: 30vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display:none
  }
`;