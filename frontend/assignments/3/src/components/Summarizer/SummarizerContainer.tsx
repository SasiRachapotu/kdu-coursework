import { SummarizerContainerWrapper } from '../../styles/summarizerStyles/summarizerContainer.style'
import SummaryItem from './SummaryItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


function SummarizerContainer() {
    const summaryTransactions= useSelector((store:RootState)=>store.summarizer.summary);
  return (
    <SummarizerContainerWrapper>
    {summaryTransactions.map((item) => (
      <SummaryItem key={item.company} item={item} />
    ))}
  </SummarizerContainerWrapper>
  )
}

export default SummarizerContainer