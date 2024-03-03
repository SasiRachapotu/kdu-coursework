import React from 'react'
import Filter from '../filter/Filter'

import './filterContainer.scss'

interface IFilterHandler{
  filters:string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

interface IFilterContainerProps{
  readonly filterHandler: IFilterHandler;
}
function FilterContainer({filterHandler}:IFilterContainerProps) {
  return (
    <div className='filters-container'>
        <div className="filter-header">
          Filters
        </div>
        <div className="filters">
          {
            filterHandler.filters.map((filter)=>{
              return(
                <Filter key={filterHandler.filters.indexOf(filter)} filter={filter} filterHandler={filterHandler}></Filter>
              )
            })
          }
        </div>
        <hr></hr>
    </div>
  )
}

export default FilterContainer