import { CSSProperties } from "react";
import styled from 'styled-components';

export const candleStickContainerStyles:CSSProperties={
    margin:"1rem",
    padding:"1rem",
    display:"flex",
    fontSize:"22px"
}

export const leftContainerStyle:CSSProperties={
    flex:3,
    margin:"0.5rem",
}

export const stockDetailContainerStyles:CSSProperties={
    display:"flex",
    alignItems:"center",
    paddingLeft:"1rem"
}

export const companyStyles:CSSProperties={
    display:"flex",
    flex:1,
    border:"2px solid black",
    padding:"1rem",
    margin:"0.5rem",
    justifyContent:"space-between",
    alignItems:"center",
    position:"relative"
}

export const logoStyles:CSSProperties={
    backgroundColor:"#ffec99",
    color:"#f9c55a",
    border: "3px solid #f9c55a",
    padding:"1rem"
}


export const priceStyles:CSSProperties={
    display:"flex",
    flex:1.5,
    border:"2px solid black",
    padding:"1rem",
    margin:"0.5rem",
    justifyContent:"space-between",
    alignItems:"center",
}

export const priceRateStyles:CSSProperties={
    display:"flex",
    alignItems:"center",
    color:"#2f9e44",
    fontWeight:"bold"
}

export const upArrowStyles:CSSProperties={
    fontSize:"50px",
    width:"22px",
    maxHeight:"22px",
    color:"#2f9e44",
    fontWeight:"800",
    margin: "auto",
    marginBottom:"2rem"
}

export const downArrowStyles:CSSProperties={
    fontSize:"50px",
    width:"22px",
    maxHeight:"22px",
    color:"#e85656",
    fontWeight:"800",
    margin: "auto",
    marginBottom:"2rem"
}

export const inputQuantityStyles:CSSProperties={
    flex:1,
    margin:"0.5rem",
}

export const enterQtyInputStyles:CSSProperties={
    width:"100%",
    height:"85px",
    border:"2px solid black",
    fontSize:"22px",
    textAlign:"center"
}

export const buySellStyles:CSSProperties={
    flex:1,
    padding:"1rem",
    margin:"0.5rem"
}

export const buyStyles:CSSProperties={
    fontSize:"22px",
    backgroundColor:"#b2f2bb",
    border:"2px solid #44ab56",
    color:"#44ab56",
    width:"45%",
    height:"90px",
    padding:"1rem",
    marginRight:"0.5rem"
}
export const sellStyles:CSSProperties={
    fontSize:"22px",
    flex:1,
    width:"45%",
    height:"90px",
    backgroundColor:"#ffc9c9",
    border:"2px solid #e85656",
    color:"#e85656",
    padding:"1rem"
}

export const rightContainerStyle:CSSProperties={
    flex:1,
    // border:"2px solid black",
    padding:"1rem",
    margin:"0.5rem",
    paddingTop:"1.4rem"
}

export const candleStickStyles:CSSProperties={
    border:"2px solid black",
    width:"93%",
    height:"500px",
    // padding:"1rem",
    margin:"1rem",
    marginLeft:"2rem",
    display:"flex",
    alignItems:"flex-end"
}

export const personalHistoryStyles:CSSProperties={
    // margin:"1rem",
    padding:"1rem",
    border:"2px solid black",
    height:"44%",
    overflow:"scroll",
}

export const globalHistoryStyles:CSSProperties={
    border:"2px solid black",
    height:"44%",
    marginTop:"2rem",
    overflow:"scroll"
}

export const PersonalHistoryContainer = styled.div`
  padding: 1rem;
  border: 2px solid black;
  height: 44%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display:none
  }
`;

export const GlobalHistoryContainer = styled.div`
  border: 2px solid black;
  height: 30vh;
  margin-top: 2rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display:none
  }
`;

export const PersonalHistoryHeading = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

export const personalHistoryConatinerStyle:CSSProperties={
    marginTop:"1rem",
    height:"22vh"
}

export const buttonStyle:CSSProperties={
    backgroundColor:"white",
    border:"none"
}

export const DropdownMenu = styled.div`
  position: absolute;
  bottom: -30vh;
  left: 0px;
  border: 2px solid black;
  width: 90%;
  padding: 1rem;
  background-color: #e9ecef;
  overflow: scroll;
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display:none
  }
`;

export const eachStockStyle:CSSProperties={
    display:"flex",
    borderBottom:"2px solid black",
    width:"98%",
    marginBottom:"1rem",
    alignItems:"center",
    justifyContent:"flex-start",
    padding:"0.4rem"
}

export const newLogoStyles:CSSProperties={
    backgroundColor:"#ffec99",
    color:"#f9c55a",
    border: "3px solid #f9c55a",
    padding:"1rem",
    width:"20%",
    textAlign:"center",
    marginRight:"1rem"
}

export const linkDropStyles:CSSProperties={
    color:"black",
    textDecoration:"none"
}
