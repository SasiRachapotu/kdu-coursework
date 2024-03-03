import { GlobalHistoryItemStyles, timeBoughtStyle } from '../../styles/candleStickStyles/globalHistoryItem.style'
import { IRoomTransaction } from '../../redux/TransactionSlice'

interface IGlobalHistoryProps{
    readonly transaction:IRoomTransaction
}
function GlobalHistoryItem({transaction}:IGlobalHistoryProps) {
  return (
    <div className="global-history-item" style={GlobalHistoryItemStyles}>
        <div className="person-details">
        Sagun {transaction.type} {transaction.numberOfStocks} {transaction.stockName}
        </div>
        <div className="time-bought" style={timeBoughtStyle}>
        6:00 AM
        </div>
    </div>
  )
}

export default GlobalHistoryItem