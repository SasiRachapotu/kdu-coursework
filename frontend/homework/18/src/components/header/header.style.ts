import { CSSProperties } from "react";

export const mainContainerStyle:CSSProperties={
    width:"100%",
    backgroundColor:"#2a2a72",
    fontSize:"20px"
}
export const headerStyle:CSSProperties ={
    width:"90%",
    display:"flex",
    color:"white",
    height:"70px",
    alignItems:"center",
    margin:"auto",
    justifyContent:"space-between",
}


export const searchBarStyle:CSSProperties={
    padding:"1rem"
    // width:"50%",
}

export const searchInputBar:CSSProperties={
    fontSize:"20px"
}


export const filterSortStyle:CSSProperties={
    display: "flex",
    justifyContent:"flex-end",
    width:"30%"
}

export const filterStyle:CSSProperties={
    display:"flex",
    padding:"1rem",
    fontSize:"20px",
    alignItems:"center",
}

export const sortStyle:CSSProperties={
    display:"flex",
    padding:"1rem",
    fontSize:"24px",
    alignItems:"center",
}

export const mediaQueryStyles = {
    "@media (max-width: 768px)": {
      headerStyle: {
        backgroundColor:"red",
        flexDirection:"column"
      },
      searchBarStyle: {
        width: "100%"
      }
    }
  };