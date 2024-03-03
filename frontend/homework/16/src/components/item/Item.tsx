import "./item.scss";
import { useDispatch } from "react-redux";
import { removeItem, toggleChecked } from "../../redux/ItemsSlice";

interface IItem {
  id: string;
  text: string;
  checked:boolean
}

interface IItemProps{
  readonly listItem:IItem;
}

function Item({listItem}:IItemProps) {

  const itemsDispatch = useDispatch();
  function deleteHandler() {
    itemsDispatch(removeItem(listItem.id))
  }

  function checkHandler(){
    itemsDispatch(toggleChecked(listItem.id));
  }
  return (
    <div className={`item ${listItem.checked===true?"item-strike" : ""}`}>
      <div className={`item-content ${listItem.checked===true?"item-content-strike" : ""}`}>{listItem.text}</div>
      <div className="delete-check-box">
        <input type="checkbox" id="checkbox" onChange={checkHandler}></input>
      <button id="delete-btn" onClick={deleteHandler}>
        X
      </button>
      </div>
    </div>
  );
}

export default Item;
