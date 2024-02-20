import React, { useState } from 'react'

import './header.scss'

interface IItem{
    id:number;
    text:string;
}

interface IItemsSetItem{
    todoItems:IItem[],
    setTodoItems:React.Dispatch<React.SetStateAction<{
        id: number;
        text: string;
    }[]>>
}


interface ISearchTermHandler{
    searchTerm:string;
    setSearchTerm:React.Dispatch<React.SetStateAction<string>>;
}

interface IProps{
    readonly itemHandler: IItemsSetItem;
    readonly searchTermHandler:ISearchTermHandler;
}


function Header({itemHandler,searchTermHandler}:IProps) {

    const [searchValue,setSearchValue] = useState("");

    function searchHandler(e:any){
        setSearchValue(e.target.value)
        searchTermHandler.setSearchTerm(e.target.value);
    }
  return (
    <div className="outer-main-div">
        <div className='heading-container'>
        <h1 className="heading">
            Item lister
        </h1>

        <div className="search-bar">
            <input id='search-item' placeholder='Search items...' onChange={searchHandler} value={searchValue}></input>
        </div>
    </div>
    </div>
  )
}

export default Header