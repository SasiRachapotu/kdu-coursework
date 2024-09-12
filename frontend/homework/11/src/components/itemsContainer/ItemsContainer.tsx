import React, { useState } from "react";

import "./ItemsContainer.scss";
import Item from "../item/Item";

interface IItem {
  id: number;
  text: string;
}

interface IItemsSetItem {
  todoItems: IItem[];
  setTodoItems: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        text: string;
      }[]
    >
  >;
}
interface ISearchTermHandler {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

interface IProps {
  readonly propItem: IItemsSetItem;
  readonly searchTermHandler: ISearchTermHandler;
}

function ItemsContainer({ propItem, searchTermHandler }: IProps) {
  const [inpValue, setInpValue] = useState("");

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInpValue(e.target.value);
  }

  function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    propItem.setTodoItems([
      ...propItem.todoItems,
      { id: propItem.todoItems.length + 1, text: inpValue },
    ]);
    setInpValue("");
  }

  function filterHandler() {
    return propItem.todoItems.filter((item1) =>
      item1.text.toLowerCase().includes(searchTermHandler.searchTerm.toLowerCase())
    );
  }

  function renderItems() {
    if (searchTermHandler.searchTerm === "") {
      return renderTodoItems();
    } else {
      return renderFilteredItems();
    }
  }
  
  function renderTodoItems() {
    if (propItem.todoItems.length === 0) {
      return <p>No items left in todo</p>;
    } else {
      return propItem.todoItems.map((item1) => (
        <Item key={item1.id} item={{ ...item1 }} propItem1={{ ...propItem }} />
      ));
    }
  }
  
  function renderFilteredItems() {
    const filteredItems = filterHandler();
  
    if (filteredItems.length === 0) {
      return <p>No items found</p>;
    } else {
      return filteredItems.map((item2) => (
        <Item key={item2.id} item={{ ...item2 }} propItem1={{ ...propItem }} />
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
