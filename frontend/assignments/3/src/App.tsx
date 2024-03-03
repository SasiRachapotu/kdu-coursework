import CandleStickPage from "./pages/CandleStickPage";
import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPortfolio from "./pages/MyPortfolio";
import Summarizer from "./pages/Summarizer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, itemsDispatch } from "./redux/store";
import { getSummarizedTransactions } from "./redux/thunk/getSummarizedTransactions";
import { setSummary } from "./redux/SummarizerSlice";

export function App() {
  const myWorker = new Worker("src/worker.ts");
  console.log(myWorker);
  const summaryDispatch = useDispatch<itemsDispatch>();
  const summaryTransactions = useSelector(
    (store: RootState) => store.summarizer.summaryTransactions
  );

  useEffect(() => {
    summaryDispatch(getSummarizedTransactions());
    if (summaryTransactions.length != 0) {
      myWorker.postMessage(summaryTransactions);
    }
  }, []);

  myWorker.onmessage = (data) => {
    console.log("worker response");
    console.log(data.data);
    summaryDispatch(setSummary(data.data));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/candlesticks" element={<CandleStickPage />}></Route>
        <Route path="/myportfolio" element={<MyPortfolio />}></Route>
        <Route path="/summarizer" element={<Summarizer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
