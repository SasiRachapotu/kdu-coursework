import React, { useState } from "react";
import SingleFilterItem from "./SingleFilterItem";
import {
  SearchInput,
  StockNamesContainer,
  checkBoxstyle,
  dateContainerStyles,
  dateStyles,
  filterContaierStyle,
  filterHeaderStyle,
  passedStyles,
  passedfailedStyles,
  rightFilterHeaderStyles,
  searchContainerStyles,
  searchImageStyles,
} from "../../styles/portfoliostyles/filters.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState, itemsDispatch } from "../../redux/store";
import { clearAllFilter, modifyDateFilter, modifyEndDate, modifyFilterInput, modifyStartDate, modifyStatusList } from "../../redux/PortfolioSlice";

function Filters() {
  const [searchInput,setSearchInput] = useState("");
  const [dateFilter,setDateFilter] = useState(false);
  const statusList = useSelector((store:RootState)=>store.portfolio.statusList);
  const allstocks = useSelector((store: RootState) => store.stocks);
  const portfolioDispatch = useDispatch<itemsDispatch>();

  function searchChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
    setSearchInput(e.currentTarget.value);
    portfolioDispatch(modifyFilterInput(e.currentTarget.value));
  }

  function statusHandler(status:string){
    portfolioDispatch(modifyStatusList(status))
  }

  function startDateHandler(e:React.ChangeEvent<HTMLInputElement>){
    portfolioDispatch(modifyStartDate(e.currentTarget.valueAsDate!));
  }
  function endDateHandler(e:React.ChangeEvent<HTMLInputElement>){
    portfolioDispatch(modifyEndDate(e.currentTarget.valueAsDate!));
    setDateFilter(true);
    portfolioDispatch(modifyDateFilter(true));
  }

  function clearAllFunction(){
    setSearchInput("");
    setDateFilter(false);
    portfolioDispatch(clearAllFilter());
  }

  return (
    <div className="filter-container" style={filterContaierStyle}>
      <div className="filter-header" style={filterHeaderStyle}>
        <div className="left-filter-header">Filters</div>
        <button className="right-filter-header" style={rightFilterHeaderStyles} onClick={clearAllFunction}>Clear All</button>
      </div>
      <div className="search-container" style={searchContainerStyles}>
        <div className="search-image">
          <img
            src="../src/assets/search.png"
            alt="search"
            style={searchImageStyles}
          ></img>
        </div>
        <SearchInput type="text" value={searchInput} placeholder="Search for a Stock" onChange={(e)=>searchChangeHandler(e)} />
      </div>
      <div className="date-container" style={dateContainerStyles}>
        <input type="date" placeholder="Start Date" style={dateStyles} onChange={(e)=>{startDateHandler(e)}}></input>
        <input type="date" placeholder="End Date" style={dateStyles} onChange={(e)=>{endDateHandler(e)}}></input>
      </div>
      <div className="passed-failed" style={passedfailedStyles}>
        <div className="passed" style={passedStyles}>
          <input type="checkbox" style={checkBoxstyle} checked={statusList?.includes("Passed")}  onChange={()=>{statusHandler("Passed")}}></input>
          <div className="passed-name">Passed</div>
        </div>
        <div className="failed" style={passedStyles}>
          <input type="checkbox" style={checkBoxstyle} checked={statusList?.includes("Failed")} onChange={()=>{statusHandler("Failed")}}></input>
          <div className="failed-name">Failed</div>
        </div>
      </div>
      <StockNamesContainer>
        {allstocks.stocks.map((stock) => {
          return (
            <SingleFilterItem
              key={stock.stock_symbol}
              name={stock.stock_name}
            />
          );
        })}
      </StockNamesContainer>
    </div>
  );
}

export default Filters;
