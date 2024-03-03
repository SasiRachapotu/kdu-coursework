import { CSSProperties } from "react";
import styled from 'styled-components';

export const portfolioContainerStyle:CSSProperties={
    margin:"1rem",
    display:"flex"
}

export const leftContainerStyles:CSSProperties={
    flex:1,
    padding:"1rem",
    display:"flex",
    justifyContent:"center"
}

export const rightContainerStyles:CSSProperties={
    flex:3,
    height:"80vh",
    overflow:"scroll"
}

export const RightContainer = styled.div`
  flex: 3;
  height: 80vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display:none
  }
`