import {ItemContainer} from "../itemcontainer/ItemContainer";
import { Header } from "../header/Header";
import { marketPlaceStyles } from "./marketplace.style";

import {BrowserRouter, Routes,Route} from "react-router-dom"
import ItemDetail from "../itemdetail/ItemDetail";
import { useEffect } from "react";
import { itemsDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/thunk/getProducts";

function MarketPlace() {
  const itemsDispatch:itemsDispatch = useDispatch();
  useEffect(() => {
    itemsDispatch(getProducts())
  }, [itemsDispatch]);
  return (
    <div className="market-place" style={marketPlaceStyles}>
        <Header></Header>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<ItemContainer></ItemContainer>}></Route>
          <Route path="/item/:id" element={<ItemDetail></ItemDetail>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default MarketPlace;
