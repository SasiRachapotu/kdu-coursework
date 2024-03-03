import { buyStyles, dateStyles, personalHistoryItemStyles, sellStylesColor } from '../../styles/candleStickStyles/personalHistoryItem.style'
import { ITransaction } from '../../redux/TransactionSlice'

interface IPersonalHistoryProps{
    readonly transaction:ITransaction
}
function PersonalHistoryItem({transaction}:IPersonalHistoryProps) {
  return (
    <div className="personal-history-item" style={personalHistoryItemStyles}>
        <div className="stock-details-date">
            <div className="amount-stocks">
                {transaction.numberOfStocks} Stocks
            </div>
            <div className="date" style={dateStyles}>
            {transaction.date instanceof Date ? transaction.date.toUTCString():""}
            </div>
        </div>
        <div className="buy-sell" style={transaction.type==="BUY"?buyStyles:sellStylesColor}>
            {transaction.type}
        </div>
    </div>
  )
}

export default PersonalHistoryItem