import React, { useContext, useState } from "react";

import "./header.scss";
import { searchContextApi } from "../../context/SearchContextProvider";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const searchContext = useContext(searchContextApi);
  function searchHandler(e: any) {
    setSearchValue(e.target.value);
    searchContext.setSearchTermFunction(e.target.value);
  }
  return (
    <div className="outer-main-div">
      <div className="heading-container">
        <h1 className="heading">Item lister</h1>

        <div className="search-bar">
          <input
            id="search-item"
            placeholder="Search items..."
            onChange={searchHandler}
            value={searchValue}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Header;
