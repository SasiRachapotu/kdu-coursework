import Navbar from '../components/DashBoard/Navbar'
import ExploreBar from '../components/DashBoard/ExploreBar'
import StockContainer from '../components/DashBoard/StockContainer'

export function Dashboard() {
  return (
    <div>
        <Navbar></Navbar>
        <ExploreBar></ExploreBar>
        <StockContainer></StockContainer>
    </div>
  )
}