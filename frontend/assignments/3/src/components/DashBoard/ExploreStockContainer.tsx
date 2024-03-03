import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { basePriceStyle, headerStyle, paginatedStyles, rightHeader, stockContainerStyle, stocksStyles, subContainerStyle } from '../../styles/stockContainer.style';
import StockItem from './StockItem';
import { Pagination } from '@mui/material';

function ExploreStockContainer() {
    const allStocks = useSelector((store:RootState)=>store.stocks.stocks);
    const [currPage, setCurrPage] = useState<number>(1);
    const exploreStocks = useSelector((state:RootState)=>state.stocks.exploreStocks);
    const exploreStockDetails = allStocks.filter((stock)=>exploreStocks.includes(stock.stock_name));
    const pageCount = Math.ceil(exploreStocks.length / 6);


    const handlePageChange = (event:React.ChangeEvent<unknown>, page:number) => {
        console.log(event.currentTarget);
        setCurrPage(page);
      };


  return (
    <div className="stock-container" style={stockContainerStyle}>
        <div className="sub-container" style={subContainerStyle}>
        <div className="header" style={headerStyle}>
            <div className="company" style={{flex:2}}>
                Company
            </div>
            <div className="right-header" style={rightHeader}>
                <div className="base-price" style={basePriceStyle}>
                    Base Price
                </div>
                <div className="Watchlist">
                    Watchlist
                </div>
            </div>
        </div>
        <div className="stocks" style={stocksStyles}>
            {exploreStockDetails.slice((currPage-1)*6,currPage*6).map((stock)=>{
                return(
                    
                    <StockItem {...{stock: stock}}></StockItem>
                )
            })}
        </div>
        <div className="paginated-footer" style={paginatedStyles}>
        <Pagination count={pageCount} color="primary" onChange={handlePageChange}/>
        </div>
        </div>
    </div>
  )
}

export default ExploreStockContainer