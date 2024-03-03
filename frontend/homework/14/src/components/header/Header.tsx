import React, { useContext } from "react";

import {
  headerStyle,
  filterSortStyle,
  filterStyle,
  sortStyle,
  mainContainerStyle,
  searchBarStyle,
  searchInputBar,
} from "./header.style";
import { ItemContextApi } from "../../context/ItemsContext";

export function Header() {
  const itemContainerContext = useContext(ItemContextApi);

  function handleChange(e:React.ChangeEvent<HTMLSelectElement>){
    console.log(e.target.value);
    itemContainerContext.setCurrentFilterFunction(e.target.value)
  }
  function handleSort(e:React.ChangeEvent<HTMLSelectElement>){
    itemContainerContext.setSortFunction(e.target.value)
  }

  function searchHandler(){
    itemContainerContext.setFilterItemsFunction(itemContainerContext.filterItems.filter((item)=>item.title.includes(itemContainerContext.search)))
    itemContainerContext.setSearchFunction("");
  }

  function searchInputHandler(e:React.ChangeEvent<HTMLInputElement>){
    itemContainerContext.setSearchFunction(e.target.value);
  }
  return (
    <div className="main-container" style={mainContainerStyle}>
      <div className="header" style={headerStyle}>
        <div className="search-bar" style={searchBarStyle}>
          <input id="search-input" placeholder="Search.." style={searchInputBar} value={itemContainerContext.search} onChange={(e)=>{searchInputHandler(e)}}></input>
          <button id="search-btn" style={searchInputBar} onClick={()=>{searchHandler()}}> search</button>
        </div>

        <div className="filter-sort" style={filterSortStyle}>
          <div className="filter" style={filterStyle}>
            <div className="filter-name" style={{marginRight:"5px",fontSize:"24px"}}>Filter: </div>
            <div className="filter-entry">
              <select name="filter" id="filter" value={itemContainerContext.currentFilter} style={{fontSize:"24px"}} onChange={(e)=>{handleChange(e)}}>
              <option key="none" value="">none</option>
                {Array.from(itemContainerContext.filters).map((filter)=>{
                  return(
                    <option key={filter} value={filter}>{filter}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="sort" style={sortStyle}>
            <div className="sort-name" style={{marginRight:"5px", fontSize:"24px"}}>Sort:</div>
            <div className="sort-entry">
              <select name="select" id="select" value={itemContainerContext.sort} style={{fontSize:"24px"}} onChange={(e)=>{handleSort(e)}}>
                <option value="">none</option>
                <option value="ascending">ascending</option>
                <option value="descending">descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
