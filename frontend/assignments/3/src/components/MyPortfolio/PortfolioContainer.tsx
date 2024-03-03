import { useEffect } from 'react'
import { RightContainer, leftContainerStyles, portfolioContainerStyle } from '../../styles/portfoliostyles/portfolio.style'
import Filters from './Filters'
import { amountStyles, dataBlockStyles, dateHeadingStyle, individualStockStyles, stockNameStyles, stockSymbolStyles, timeStatusStyles } from '../../styles/portfoliostyles/individualStock.style'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, itemsDispatch } from '../../redux/store'
import { getTransactions } from '../../redux/thunk/getTransaction'
import { IParsedResponse } from '../../redux/PortfolioSlice'

export function PortfolioContainer() {
  const statusList = useSelector((store:RootState)=>store.portfolio.statusList);
  const filterStocksList = useSelector((store:RootState)=>store.portfolio.filterStocksList);
  const filterInput = useSelector((store:RootState)=>store.portfolio.filterInput);
  const startDate = useSelector((store:RootState)=>store.portfolio.startDate);
  const endDate = useSelector((store:RootState)=>store.portfolio.endDate);
  const dateFilter = useSelector((store:RootState)=>store.portfolio.dateFilter);

  const groupedTransactions = useSelector<{ [date: string]: IParsedResponse[] }>((store:RootState)=>store.portfolio.groupedTransaction);
  const portfolioDispatch = useDispatch<itemsDispatch>();


  useEffect(()=>{
    portfolioDispatch(getTransactions())
  },[portfolioDispatch])
  return (
    <div className='main-container' style={portfolioContainerStyle}>
      <div className="left-container" style={leftContainerStyles}>
        <Filters />
      </div>
      <RightContainer>
        {Object.entries(groupedTransactions).map(([date, transactionsOfDay]) => {
          // Filter transactions based on various conditions
          const filteredTransactions = transactionsOfDay.filter(transaction => {
            const statusFilter = statusList.length === 0 || statusList.includes(transaction.status);
            const filterStocksFilter =
              filterStocksList.length === 0 || filterStocksList.includes(transaction.stock_name);
            const filterInputFilter =
              filterInput === "" ||
              transaction.stock_name.toLowerCase().includes(filterInput.toLowerCase());

            return statusFilter && filterStocksFilter && filterInputFilter;
          });

          // Check if filtered transactions have a length greater than 0
          if (filteredTransactions.length > 0) {
            return (
              <div key={date} className="date-block" style={dataBlockStyles}>
                {/* Check if dateFilter is true or false */}
                {dateFilter ? (
                  <>
                    {startDate <= new Date(date) && endDate >= new Date(date) && (
                      <>
                        <div className="date-heading" style={dateHeadingStyle}>
                          {date}
                        </div>
                        {filteredTransactions.map((transaction) => (
                          <div
                            key={transaction.stock_name}
                            className="individual-stock"
                            style={individualStockStyles}
                          >
                            {/* Render transaction details */}
                            <div className="stock-name" style={stockNameStyles}>
                              {transaction.stock_name}
                            </div>
                            <div className="stock-symbol" style={stockSymbolStyles}>
                              {transaction.stock_symbol}
                            </div>
                            <div className="amount" style={amountStyles}>
                              ₹{transaction.transaction_price.toFixed(2)}
                            </div>
                            <div className="time-status" style={timeStatusStyles}>
                              <div className="time">
                                {transaction.timestamp instanceof Date
                                  ? transaction.timestamp.toLocaleTimeString()
                                  : '6:00 AM'}
                              </div>
                              <div className="status">
                                <img
                                  src={`../src/assets/${transaction.status.toLowerCase()}-dot.png`}
                                  alt={transaction.status}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  // Render entire data if dateFilter is false
                  <>
                    {(filteredTransactions.length > 0 || !dateFilter) && (
                      <>
                        <div className="date-heading" style={dateHeadingStyle}>
                          {date}
                        </div>
                        {filteredTransactions.map((transaction) => (
                          <div
                            key={transaction.stock_name}
                            className="individual-stock"
                            style={individualStockStyles}
                          >
                            {/* Render transaction details */}
                            <div className="stock-name" style={stockNameStyles}>
                              {transaction.stock_name}
                            </div>
                            <div className="stock-symbol" style={stockSymbolStyles}>
                              {transaction.stock_symbol}
                            </div>
                            <div className="amount" style={amountStyles}>
                              ₹{transaction.transaction_price.toFixed(2)}
                            </div>
                            <div className="time-status" style={timeStatusStyles}>
                              <div className="time">
                                {transaction.timestamp instanceof Date
                                  ? transaction.timestamp.toLocaleTimeString()
                                  : '6:00 AM'}
                              </div>
                              <div className="status">
                                <img
                                  src={`../src/assets/${transaction.status.toLowerCase()}-dot.png`}
                                  alt={transaction.status}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            );
          }
          return null; // Return null if there are no transactions to render
        })}
      </RightContainer>
    </div>
  );
}
