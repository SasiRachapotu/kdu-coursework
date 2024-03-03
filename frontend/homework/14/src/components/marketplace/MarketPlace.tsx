import {ItemContainer} from "../itemcontainer/ItemContainer";
import { Header } from "../header/Header";
import { marketPlaceStyles } from "./marketplace.style";
import ItemsContext from "../../context/ItemsContext";

import {BrowserRouter, Routes,Route} from "react-router-dom"
import ItemDetail from "../itemdetail/ItemDetail";

function MarketPlace() {
  return (
    <div className="market-place" style={marketPlaceStyles}>
      <ItemsContext>
        <Header></Header>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<ItemContainer></ItemContainer>}></Route>
          <Route path="/item/:id" element={<ItemDetail></ItemDetail>}></Route>
        </Routes>
        </BrowserRouter>
      </ItemsContext>
    </div>
  );
}

export default MarketPlace;
