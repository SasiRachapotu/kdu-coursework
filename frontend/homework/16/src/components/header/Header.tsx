import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeSearch } from "../../redux/SearchSlice";

function Header() {
  const searchValueReducer = useSelector((state:RootState)=>state.search.search);
  const reduxDispatch = useDispatch();
  function searchHandler(e:  React.ChangeEvent<HTMLInputElement>) {
    reduxDispatch(changeSearch(e.target.value))
  }
  return (
    <div className="outer-main-div">
      <div className="heading-container">
        <h1 className="heading">Item lister</h1>

        <div className="search-bar">
          <input
            id="search-item"
            placeholder="Search items..."
            onChange={(e)=>{searchHandler(e)}}
            value={searchValueReducer}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Header;
