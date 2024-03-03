import { useDispatch, useSelector } from "react-redux";
import { IAPIResponse } from "../../interface/ApiResponse";
import {
  AddStockButton,
  AddStockImage,
  BasePrice,
  CrossImage,
  PriceWatchlist,
  StockDetails,
  StyledLink,
  TickImage,
} from "../../styles/StockItem.style";
import { RootState, itemsDispatch } from "../../redux/store";
import { modifyExploreStock } from "../../redux/StockSlice";
import { useState } from "react";

interface IStockItemProps {
  readonly stock: IAPIResponse;
}
function StockItem({ stock }: IStockItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const filterItems = useSelector(
    (state: RootState) => state.stocks.exploreStocks
  );
  const stocksDispatch = useDispatch<itemsDispatch>();
  function stockAddHandler() {
    stocksDispatch(modifyExploreStock(stock.stock_name));
  }
  const handleMouseOver = () => {
    setIsHovered(false);
  };

  const handleMouseOut = () => {
    setIsHovered(true);
  };
  return (
    <StockDetails>
      <StyledLink
        to={`/candlesticks?stockName=${stock.stock_name}`}
        key={stock.stock_name}
      >
        <div className="stock-name">{stock.stock_name}</div>
      </StyledLink>
      <PriceWatchlist>
        <BasePrice>&#8377;{stock.base_price}</BasePrice>
        <AddStockButton onClick={stockAddHandler}>
          {filterItems.includes(stock.stock_name) ? (
            <>
              {!isHovered ? (
                <TickImage
                  className="tick-image"
                  src="../src/assets/tick.png"
                  alt="add-stock"
                  onMouseOver={handleMouseOut}
                  onMouseOut={handleMouseOver}
                />
              ) : (
                <CrossImage
                  src="../src/assets/cross.png"
                  alt="add-stock"
                  onMouseOut={handleMouseOver}
                  onMouseOver={handleMouseOut}
                />
              )}
              {/* <TickImage className="tick-image" src="../src/assets/tick.png" alt="add-stock" onMouseOver={handleMouseOver} />
            <CrossImage src="../src/assets/cross.png" alt="add-stock" onMouseOut={handleMouseOut}/> */}
            </>
          ) : (
            <AddStockImage src="../src/assets/addstock.png" alt="add-stock" />
          )}
        </AddStockButton>
      </PriceWatchlist>
    </StockDetails>
  );
}

export default StockItem;
