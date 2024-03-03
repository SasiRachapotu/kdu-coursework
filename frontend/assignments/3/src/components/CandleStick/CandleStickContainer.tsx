import React, { useRef } from 'react'
import {
  DropdownMenu,
  GlobalHistoryContainer,
  PersonalHistoryContainer,
  PersonalHistoryHeading,
  buttonStyle,
  buySellStyles,
  buyStyles,
  candleStickContainerStyles,
  candleStickStyles,
  companyStyles,
  downArrowStyles,
  eachStockStyle,
  enterQtyInputStyles,
  gridBoxStyles,
  gridStyles,
  inputQuantityStyles,
  leftContainerStyle,
  linkDropStyles,
  logoStyles,
  newLogoStyles,
  personalHistoryConatinerStyle,
  priceRateStyles,
  priceStyles,
  rightContainerStyle,
  sellStyles,
  stockDetailContainerStyles,
  upArrowStyles,
} from "../../styles/candleStickStyles/candleStickContainer.style";
import GlobalHistoryItem from "./GlobalHistoryItem";
import PersonalHistoryItem from "./PersonalHistoryItem";
import { Link, useLocation } from "react-router-dom";

import { socket } from "../../Socket";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, itemsDispatch } from "../../redux/store";
import { IAPIResponse } from "../../interface/ApiResponse";
import { IRoomTransaction, modifyBuyInitialAmount, modifyCurrentTransaction, modifyRoomTransaction, modifySnackBarStatus } from "../../redux/TransactionSlice";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export function CandleStickContainer() {
  const location = useLocation();
  const currentTransactions= useSelector((store:RootState)=>store.transactions.currentTransactions)
  const roomTransactions= useSelector((store:RootState)=>store.transactions.roomTransactions)
  const queryParams = new URLSearchParams(location.search);
  const stockName = queryParams.get("stockName");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const allStocks = useSelector((store: RootState) => store.stocks.stocks);
  const [dropDown, setDropdown] = useState<boolean>(false);
  const [currStock, setCurrStock] = useState<IAPIResponse>();
  const [currPrice,setCurrPrice] = useState(0);
  const [inputValue,setInputValue] = useState("");
  const [currStockBarPrice, setCurrStockBarPrice] = useState(0);
  const [stockIncrease, setStockIncrease] = useState(true);
  const transactionReducer = useDispatch<itemsDispatch>();
  const snackBarStatus = useSelector((store:RootState)=>store.transactions.snackBarStatus)
  const [successFailure,setSuccessFailure] = useState("success");
  const initialAmount = useSelector((store:RootState)=>store.transactions.initialAmount);
  const [percentage,setPercentage] = useState(3);
  const [bars, setBars] = useState([]);

  const currentRefamt = useRef<number>(0);
  const addBar = (value:number,color:string,borderColor:string) => {
    const newBar = {
      id: bars.length + 1,
      value: value,
      color:color,
      borderColor:borderColor,
    };
    setBars((prevBars) => [...prevBars, newBar]);
  };

  useEffect(() => {
    console.log(stockName);
    function onConnect() {
      setIsConnected(true);
    }
    setCurrStock(allStocks.find((stock) => stock.stock_name === stockName));
    setCurrPrice(allStocks.find((stock) => stock.stock_name === stockName)?.base_price)
    setDropdown(false)

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    socket.emit("join room",{room:stockName})

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, [stockName]);

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("connected succesfully");
    });
    socket.emit("join room",{room:stockName});

    socket.on("stock-bought",(data:IRoomTransaction)=>{
      console.log(data);
      transactionReducer(modifyRoomTransaction(data));
    })

    socket.on("stock-price-update",(data:number)=>{
      if(currentRefamt.current>data){
        console.log(currStockBarPrice);
        setStockIncrease(false);
        setCurrStockBarPrice(data);

        setPercentage((((currentRefamt.current-data)/currentRefamt.current)*100).toFixed(2))
        setCurrPrice(data-currPrice);
        currentRefamt.current=data;
        addBar(data,"#ffc9c9","#e85656");
      }
      else{
        console.log(currStockBarPrice);
        console.log("data===="+data);
        setStockIncrease(true);
        setCurrStockBarPrice(data);
        setCurrPrice(data);
        setPercentage((((data-currentRefamt.current)/data)*100).toFixed(2))
        currentRefamt.current=data;
        addBar(data,"#b2f2bb","#44ab56");
      }
    })

  },[socket,stockName])

  function dropdownClickHanlder() {
    setDropdown(!dropDown);
  }

  function inputValueHandler(e: React.ChangeEvent<HTMLInputElement>){
    setInputValue(e.currentTarget.value)
  }

  function buyHandler(){
    console.log(currPrice);
    console.log(currPrice*parseFloat(inputValue));
    if(currPrice*parseFloat(inputValue)>initialAmount){
      console.log("snackbar true");
      transactionReducer(modifySnackBarStatus(true));
      setSuccessFailure("error");
    }
    else{
      transactionReducer(modifyCurrentTransaction({
        numberOfStocks: parseFloat(inputValue),
        date: new Date(),
        type: "BUY",
        stockName: currStock?.stock_name,
        price: currPrice
      }));
      setInputValue("");
      socket.emit("buy-transaction",{type:"BUY",numberOfStocks:parseFloat(inputValue),stockName:currStock?.stock_name,date:new Date()})
      transactionReducer(modifySnackBarStatus(true));
      transactionReducer(modifyBuyInitialAmount(currPrice*parseFloat(inputValue)));
      setSuccessFailure("success");
    }
  }

  function sellHandler(){
    transactionReducer(modifyCurrentTransaction({
      numberOfStocks: parseFloat(inputValue),
      date: new Date(),
      type: "SELL",
      stockName: currStock?.stock_name,
      price: currPrice
    }));
    setInputValue("");
    socket.emit("buy-transaction",{type:"SELL",numberOfStocks:parseFloat(inputValue),stockName:currStock?.stock_name,date:new Date()})
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    console.log(event);
    if (reason === 'clickaway') {
      return;
    }
    transactionReducer(modifySnackBarStatus(false))
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="candle-stick-container" style={candleStickContainerStyles}>
       <Snackbar
          open={snackBarStatus}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        ><Alert variant="filled" severity={successFailure==="success"?"success":"error"} onClose={handleClose}>{successFailure==="success"?'Transaction succesful':"Error Failed Transaction"}</Alert>
        </Snackbar>
      <div className="left-container" style={leftContainerStyle}>
        <div
          className="stock-details-container"
          style={stockDetailContainerStyles}
        >
          <div className="company" style={companyStyles}>
            <div className="logo" style={logoStyles}>
              {currStock?.stock_symbol}
            </div>
            <div className="company-name"> {currStock?.stock_name}</div>
            <button
              className="drop-down"
              style={buttonStyle}
              onClick={() => dropdownClickHanlder()}
            >
              <img src="../src/assets/dropdown.png" alt="dropdown"></img>
            </button>
            <div className="dropdown-menu" style={{display:dropDown?"block":"none"}}>
              <DropdownMenu>
              {allStocks
                .filter((stock) => stock.stock_name !== currStock?.stock_name)
                .map((stock) => {
                  return (
                    <Link to={`/candlesticks?stockName=${stock.stock_name}`} key={stock.stock_name} style={linkDropStyles}>
                    <div className="each-stock" key={stock.stock_name} style={eachStockStyle}>
                      <div className="logo" style={newLogoStyles}>
                        {stock?.stock_symbol}
                      </div>
                      <div className="company-name"> {stock?.stock_name}</div>
                    </div>
                    </Link>
                  );
                })}
                </DropdownMenu>
            </div>
          </div>
          <div className="price" style={priceStyles}>
            <div className="price-name">Price</div>
            <div className="price-rate" style={priceRateStyles}>
              <div className="price-amt" style={{color:stockIncrease?"#2f9e44":"#e85656"}}>{currPrice}</div>
              <div className="up" style={{...upArrowStyles ,display:stockIncrease?"block":"none" }}>
                &uarr;
              </div>
              <div className="up" style={{...downArrowStyles, display:stockIncrease?"none":"block" }}>
                &darr;
              </div>
            </div>
            <div className="price-percentage">{percentage}%</div>
          </div>
          <div className="quantity" style={inputQuantityStyles}>
            <input
              type="text"
              placeholder="Enter Qty"
              value={inputValue}
              style={enterQtyInputStyles}
              onChange={(e)=>{inputValueHandler(e)}}
            ></input>
          </div>
          <div className="buy-sell" style={buySellStyles}>
            <button className="buy" style={buyStyles} onClick={buyHandler}>
              Buy
            </button>
            <button className="sell" style={sellStyles} onClick={sellHandler}>
              Sell
            </button>
          </div>
        </div>
        <div className="candle-sticks-container" style={candleStickStyles}>
          <div className="grid" style={gridStyles}>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
            <div className="grid-box" style={gridBoxStyles}></div>
          </div>
        {bars.map((bar) => (
          <div
            key={bar.id}
            style={{
              backgroundColor: `${bar.color}`,
              height: `${bar.value}px`,
              width: '22.7px',
              border:`2px solid ${bar.borderColor}`,
              margin:"0.5px",
              boxSizing:"border-box"
            }}
          ></div>
        ))}
        </div>
      </div>
      <div className="right-conatiner" style={rightContainerStyle}>
        <PersonalHistoryContainer>
          <PersonalHistoryHeading>History</PersonalHistoryHeading>
          <div
            className="personal-history-container"
            style={personalHistoryConatinerStyle}
          >
            {currentTransactions.filter((transac)=>transac.stockName===currStock?.stock_name).map((transaction)=>{
              return(
                <PersonalHistoryItem key={transaction.stockName}  transaction={transaction}></PersonalHistoryItem>
              )
            })}
          </div>
        </PersonalHistoryContainer>
        <GlobalHistoryContainer>
          {roomTransactions.filter((transac)=>transac.stockName===currStock?.stock_name).map((transaction)=>{
            return(
              <GlobalHistoryItem key={transaction.stockName}  transaction={transaction}></GlobalHistoryItem>
            )
          })}
        </GlobalHistoryContainer>
      </div>
    </div>
  );
}

