import { borderbottom, exploreContainerStyle, exploreStyles, mywatchListStyles } from "../../styles/explorebar.style"
import { useDispatch, useSelector } from "react-redux";
import { RootState, itemsDispatch } from "../../redux/store";
import { modifyExploreState } from "../../redux/StockSlice";

function ExploreBar() {
    const exploreState = useSelector((store:RootState)=>store.stocks.exploreState);
    const stocksDispatch = useDispatch<itemsDispatch>();
    function onClickHandler(e:React.MouseEvent<HTMLButtonElement>){
        stocksDispatch(modifyExploreState(e.currentTarget.innerText.toLowerCase()));
    }
  return (
    <div className="explore-container" style={exploreContainerStyle}>
        <button className="explore" style={{...exploreStyles, ...(exploreState==="explore"?borderbottom:{borderBottom:"none"})}} onClick={(e)=>{onClickHandler(e)}}>
            Explore
        </button>
        <button className="my-watchlist" style={{...mywatchListStyles,...(exploreState==="my watchlist"?borderbottom:{borderBottom:"none"})}} onClick={(e)=>{onClickHandler(e)}}>
            My Watchlist
        </button>
    </div>
  )
}

export default ExploreBar