import { checkBoxstyle, passedStyles } from '../../styles/portfoliostyles/filters.style'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, itemsDispatch } from '../../redux/store';
import { modifyFilterStockList } from '../../redux/PortfolioSlice';

interface ISingleFilterItemProps{
    readonly name:string
}
function SingleFilterItem({name}:ISingleFilterItemProps) {
  const portfolioDispatch = useDispatch<itemsDispatch>();
  const filterStockList= useSelector((store:RootState)=>store.portfolio.filterStocksList);
  function stockAddHandler(){
    portfolioDispatch(modifyFilterStockList(name));
  }
  return (
    <div className="single-filter-container" style={passedStyles}>
        <input type='checkbox' style={checkBoxstyle} checked={filterStockList.includes(name)} onChange={stockAddHandler}></input>
        <div className="stock-name-filter">
            {name}
        </div>
    </div>
  )
}

export default SingleFilterItem