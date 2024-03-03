import { CSSProperties } from "react";

export const stockContainerStyle:CSSProperties={
    display:"flex",
    justifyContent:"center",
    marginTop:"2rem",
    width:"100%",
    // height:"60vh",
    minHeight:"fit-content",
    minWidth:"fit-content"
}

export const subContainerStyle:CSSProperties={
    width:"90%",
    border:"2px solid black",
    borderRadius:"1rem",
    fontSize:"18px",
    display:"flex",
    flexDirection:"column"
}

export const headerStyle:CSSProperties={
    display:"flex",
    justifyContent:"space-between",
    padding:"1rem",
    borderBottom:"2px solid black"
}



export const rightHeader:CSSProperties={
    display:"flex",
    width:"200px"
}

export const basePriceStyle:CSSProperties={
    marginRight:"1rem",
    flex:2,
}

export const stocksStyles:CSSProperties={
    padding:"1rem",
    flex:1
}

export const paginatedStyles:CSSProperties={
    padding:"1rem",
    display:"flex",
    justifyContent:"center",
    marginTop:"auto"
}

export const linkStyles:CSSProperties={
    color:"black",
    textDecoration:"none"
}