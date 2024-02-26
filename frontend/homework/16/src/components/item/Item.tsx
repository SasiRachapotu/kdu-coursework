import "./item.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeItems } from "../../redux/ItemsSlice";

interface IItem {
  id: number;
  text: string;
}

interface IItemProps{
  readonly listItem:IItem;
}

function Item({listItem}:IItemProps) {

  const itemsValueReducer = useSelector(
    (state: RootState) => state.items.items
  );

  const itemsDispatch = useDispatch();
  function deleteHandler() {
    itemsDispatch(
      changeItems(
        itemsValueReducer.filter(
          (item) => item.id !== listItem.id
        )
      )
    );
  }
  return (
    <div className="item">
      <div className="item-content">{listItem.text}</div>
      <button id="delete-btn" onClick={deleteHandler}>
        X
      </button>
    </div>
  );
}

export default Item;
