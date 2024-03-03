import { useContext } from "react";
import {
  allItemsStyle,
  headingSectionStyles,
  itemContainerStyles,
  kduStyles,
  mainContainer,
  marketPlaceStyles,
} from "./itemContainer.style";
import Item from "../items/Item";
import { ItemContextApi } from "../../context/ItemsContext";
import { useLocation, useNavigate } from "react-router-dom";
import { itemStyles } from "../items/item.style";

export function ItemContainer() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterQuery = queryParams.get("filter");
  const itemContainerContext = useContext(ItemContextApi);

  if (filterQuery !== null) {
    itemContainerContext.setCurrentFilterFunction(filterQuery);
  }

  const navigate = useNavigate();
  const handleItemClick = (itemId: number) => {
    navigate(`/item/${itemId}`);
  };

  const renderItems = () => {
    let itemsToRender;

    if (
      itemContainerContext.currentFilter === "" &&
      itemContainerContext.sort === "" &&
      itemContainerContext.searchItems.length === 0
    ) {
      itemsToRender = itemContainerContext.items;
    } else if (itemContainerContext.searchItems.length !== 0) {
      itemsToRender = itemContainerContext.searchItems;
    } else {
      itemsToRender = itemContainerContext.filterItems;
    }

    return itemsToRender.map((ite) => (
      <button
        key={ite.id}
        onClick={() => handleItemClick(ite.id)}
        style={itemStyles}
      >
        <Item key={ite.id} id={ite.id}></Item>
      </button>
    ));
  };
  return (
    <div className="main-container" style={mainContainer}>
      <div className="all-item-container" style={allItemsStyle}>
        <div className="heading-section" style={headingSectionStyles}>
          <div className="kdu" style={kduStyles}>
            KDU
          </div>
          <div className="market-place" style={marketPlaceStyles}>
            MARKETPLACE
          </div>
        </div>
        <div className="item-container" style={itemContainerStyles}>
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
