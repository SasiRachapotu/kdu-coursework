import React from "react";

import {
  headerStyle,
  filterSortStyle,
  filterStyle,
  sortStyle,
  mainContainerStyle,
  searchBarStyle,
  searchInputBar,
} from "./header.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCurrentFilterFunction, setFilterItemsFunction, setSearchFunction, setSortFunction } from "../../redux/ItemSlice";
import { IAPIResponse } from "../../interfaces/Interface";

export function Header() {
  const filters:Set<string> = useSelector((state:RootState)=>state.items.filters);
  const sort:string= useSelector((state:RootState)=>state.items.sort);
  const search:string = useSelector((state:RootState)=>state.items.search);
  const currentFilter:string = useSelector((state:RootState)=>state.items.currentFilter);
  const filterItems:IAPIResponse[] = useSelector((state:RootState)=>state.items.filterItems) 

  const itemsDispatch = useDispatch();

  function handleChange(e:React.ChangeEvent<HTMLSelectElement>){
    console.log(e.target.value);
    itemsDispatch(setCurrentFilterFunction(e.target.value))
  }
  function handleSort(e:React.ChangeEvent<HTMLSelectElement>){
    itemsDispatch(setSortFunction(e.target.value))
  }

  function searchHandler(){
    itemsDispatch(setFilterItemsFunction(filterItems.filter((item)=>item.title.includes(search))))
    itemsDispatch(setSearchFunction(""));
  }

  function searchInputHandler(e:React.ChangeEvent<HTMLInputElement>){
    itemsDispatch(setSearchFunction(e.target.value));
  }

  return (
    <div className="main-container" style={mainContainerStyle}>
      <div className="header" style={headerStyle}>
        <div className="search-bar" style={searchBarStyle}>
          <input id="search-input" placeholder="Search.." style={searchInputBar} value={search} onChange={(e)=>{searchInputHandler(e)}}></input>
          <button id="search-btn" style={searchInputBar} onClick={()=>{searchHandler()}}> search</button>
        </div>

        <div className="filter-sort" style={filterSortStyle}>
          <div className="filter" style={filterStyle}>
            <div className="filter-name" style={{marginRight:"5px",fontSize:"20px"}}>Filter: </div>
            <div className="filter-entry">
              <select name="filter" id="filter" value={currentFilter} style={{fontSize:"20px"}} onChange={(e)=>{handleChange(e)}}>
              <option key="none" value="">none</option>
                {Array.from(filters).map((filter)=>{
                  return(
                    <option key={filter} value={filter}>{filter}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="sort" style={sortStyle}>
            <div className="sort-name" style={{marginRight:"5px", fontSize:"20px"}}>Sort:</div>
            <div className="sort-entry">
              <select name="select" id="select" value={sort} style={{fontSize:"20px"}} onChange={(e)=>{handleSort(e)}}>
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
