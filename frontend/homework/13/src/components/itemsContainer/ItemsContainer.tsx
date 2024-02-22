import React, { createContext, useContext, useState } from "react";

import "./ItemsContainer.scss";
import Item from "../item/Item";
import { itemsContext } from "../../context/ItemsContextProvider";
import { searchContextApi } from "../../context/SearchContextProvider";

interface IItem {
  id: number;
  text: string;
}

export const itemContextProvider = createContext<IItem>({
  id: 0,
  text: "",
});

function ItemsContainer() {
  const [inpValue, setInpValue] = useState("");

  const itemsContextApi = useContext(itemsContext);

  const searchContext = useContext(searchContextApi);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInpValue(e.target.value);
  }

  function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    itemsContextApi.setTodoItemsFunction([
      ...itemsContextApi.todoItems,
      { id: itemsContextApi.todoItems.length + 1, text: inpValue },
    ]);
    console.log(inpValue);
    setInpValue("");
  }

  function filterHandler() {
    return itemsContextApi.todoItems.filter((item1) =>
      item1.text.toLowerCase().includes(searchContext.searchTerm.toLowerCase())
    );
  }

  function renderItems() {
    if (searchContext.searchTerm === "") {
      return renderTodoItems();
    } else {
      return renderFilteredItems();
    }
  }

  function renderTodoItems() {
    if (itemsContextApi.todoItems.length === 0) {
      return <p>No items left in todo</p>;
    } else {
      return itemsContextApi.todoItems.map((item1) => {
        return (
          <itemContextProvider.Provider value={item1} key={item1.id}>
            <Item key={item1.id} />
          </itemContextProvider.Provider>
        );
      });
    }
  }

  function renderFilteredItems() {
    const filteredItems = filterHandler();

    if (filteredItems.length === 0) {
      return <p>No items found</p>;
    } else {
      return filteredItems.map((item2) => (
        <itemContextProvider.Provider value={item2} key={item2.id}>
          <Item key={item2.id} />
        </itemContextProvider.Provider>
      ));
    }
  }
  return (
    <div className="items-main-container">
      <div className="items-container">
        <div className="items-header">
          <h2 className="items-header-item">Add Items</h2>
          <div className="items-input-container">
            <input
              id="items-input"
              onChange={(e) => {
                inputHandler(e);
              }}
              value={inpValue}
            ></input>
            <button id="submit-btn" onClick={(e) => submitHandler(e)}>
              Submit
            </button>
          </div>
        </div>

        <div className="sub-items-header">
          <h2 className="sub-items-heading">Items</h2>
          <div className="all-items">{renderItems()}</div>
        </div>
      </div>
    </div>
  );
}

export default ItemsContainer;
