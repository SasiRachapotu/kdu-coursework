import React, { useContext } from "react";

import "./item.scss";
import { itemsContext } from "../../context/ItemsContextProvider";
import { itemContextProvider } from "../itemsContainer/ItemsContainer";

function Item() {
  const itemsContextApi = useContext(itemsContext);
  const itemContextProviderApi = useContext(itemContextProvider);
  console.log(itemContextProviderApi.id);
  console.log(itemContextProviderApi.text);
  function deleteHandler(e: any) {
    itemsContextApi.setTodoItemsFunction(
      itemsContextApi.todoItems.filter(
        (item1) => item1.id !== itemContextProviderApi.id
      )
    );
  }
  return (
    <div className="item">
      <div className="item-content">{itemContextProviderApi.text}</div>
      <button id="delete-btn" onClick={deleteHandler}>
        X
      </button>
    </div>
  );
}

export default Item;
