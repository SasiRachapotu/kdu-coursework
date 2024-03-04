import React, { useState } from "react";

import "./ItemsContainer.scss";
import Item from "../item/Item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addItem, removeCheckedItems} from "../../redux/ItemsSlice";

import {v4 as uuidv4} from "uuid";


export function ItemsContainer() {
  const [inpValue, setInpValue] = useState("");

  const searchValueReducer = useSelector((state:RootState)=>state.search.search);

  const itemsValueReducer = useSelector((state:RootState)=>state.items.items);

  const itemsDispatch = useDispatch();


  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInpValue(e.target.value);
  }

  function submitHandler() {
    itemsDispatch(addItem({ id: uuidv4(), text: inpValue ,checked:false}));
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
      return <p className="no-items-left">No items left in todo</p>;
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
      return <p className="no-items-found">No items found</p>;
    } else {
      return filteredItems.map((item) => (
          <Item key={item.id} listItem={item}/>
      ));
    }
  }

  const removeCheckedItemsHandler =()=>{
    itemsDispatch(removeCheckedItems())
  }
  return (
    <div className="items-main-container">
      <div className="items-container">
        <div className="items-header">
          <h2 className="items-header-item">Add Items</h2>
          <div className="items-input-container">
            <input
              id="items-input"
              data-testid="items-input"
              onChange={(e) => {
                inputHandler(e);
              }}
              value={inpValue}
            ></input>
            <button id="submit-btn" data-testid="submit-btn" disabled={inpValue===""} className={`${inpValue===""?"disabled-btn":""}`}  onClick={() => submitHandler()}>
              Submit
            </button>
          </div>
        </div>

        <div className="sub-items-header">
          <h2 className="sub-items-heading">Items</h2>
          <div className="all-items">{renderItems()}</div>
        </div>

        <button id="remove-checked" data-testid="remove-checked" onClick={removeCheckedItemsHandler}>Remove checked items</button>
      </div>
    </div>
  );
}

