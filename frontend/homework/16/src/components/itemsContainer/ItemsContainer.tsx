import React, { useState } from "react";

import "./ItemsContainer.scss";
import Item from "../item/Item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeItems } from "../../redux/ItemsSlice";


export function ItemsContainer() {
  const [inpValue, setInpValue] = useState("");

  const searchValueReducer = useSelector((state:RootState)=>state.search.search);

  const itemsValueReducer = useSelector((state:RootState)=>state.items.items);

  const itemsDispatch = useDispatch();


  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInpValue(e.target.value);
  }

  function submitHandler() {
    itemsDispatch(changeItems([...itemsValueReducer,{ id: itemsValueReducer.length + 1, text: inpValue }]))
    console.log(inpValue);
    setInpValue("");
  }

  function filterHandler() {
    return itemsValueReducer.filter((item1) =>
      item1.text.toLowerCase().includes(searchValueReducer.toLowerCase())
    );
  }

  function renderItems() {
    if (searchValueReducer === "") {
      return renderTodoItems();
    } else {
      return renderFilteredItems();
    }
  }

  function renderTodoItems() {
    if (itemsValueReducer.length === 0) {
      return <p>No items left in todo</p>;
    } else {
      return itemsValueReducer.map((item) => {
        return (
            <Item key={item.id} listItem={item}/>
        );
      });
    }
  }

  function renderFilteredItems() {
    const filteredItems = filterHandler();

    if (filteredItems.length === 0) {
      return <p>No items found</p>;
    } else {
      return filteredItems.map((item) => (
          <Item key={item.id} listItem={item}/>
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
            <button id="submit-btn" onClick={() => submitHandler()}>
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

