import React from "react";

import "./todo.scss";
import Header from "../header/Header";
import ItemsContainer from "../itemsContainer/ItemsContainer";
import SearchContext from "../../context/SearchContextProvider";
import ItemsContext from "../../context/ItemsContextProvider";
function Todo() {
  return (
    <div className="main-container">
      <SearchContext>
        <Header></Header>
        <ItemsContext>
          <ItemsContainer></ItemsContainer>
        </ItemsContext>
      </SearchContext>
    </div>
  );
}

export default Todo;
