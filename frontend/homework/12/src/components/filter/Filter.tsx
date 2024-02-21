import React from 'react'

import './filter.scss'


interface IFilterHandler{
    filters:string[];
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}


interface IFilterProps{
    readonly filter:string;
    readonly filterHandler:IFilterHandler;
}

function Filter({filter,filterHandler}:IFilterProps) {
    function onClickFilterHandler(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        filterHandler.setFilters(filterHandler.filters.filter((filt1)=>filt1!==filter));
    }
  return (
    <div className='filter'>
        <div className="filter-name">
            {filter}
        </div>
        <div className="filter-delete">
            <button id='filter-delete-btn' onClick={(e)=>onClickFilterHandler(e)}>x</button>
        </div>
    </div>
  )
}

export default Filter