import { firstLineStyles, mainItemStyles, secondLineStyles } from '../../styles/summarizerStyles/summaryItem.style'
import { IUnitTransactionData } from '../../worker'

interface ISummaryItemProp{
    buyObject:IUnitTransactionData,
    company:string,
    profit:number,
    sellObject:IUnitTransactionData,
    symbol:string
}

interface ISummaryProps{
    item:ISummaryItemProp
}
function SummaryItem({item}:ISummaryProps) {
  return (
    <div className="main-item-container" style={mainItemStyles}>
        <div className="first-line" style={firstLineStyles}>
            <div className="name">
                {item.company}
            </div>
            <div className="buy-details">
            Buy: {item.buyObject.price} on {item.buyObject.date}
            </div>
        </div>
        <div className="second-line" style={secondLineStyles}>
            <div className="profit-margin">
            Profit margin: {item.profit}
            </div>
            <div className="sell-details">
            Sell: {item.sellObject.price} on {item.sellObject.date}
            </div>
        </div>
    </div>
  )
}

export default SummaryItem