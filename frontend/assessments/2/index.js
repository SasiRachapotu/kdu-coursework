const socket = io("http://localhost:3000")

let price = document.querySelector(".actual-value");

let stockName = document.querySelector("#stock-name");




(async ()=>{
    fetch("http://localhost:3000/stocks").then((res)=>{
        return res.json();
    }).then((res2)=>{
        price.innerText=res2.stockdetails[0].price;
        stockName.innerText=res2.stockdetails[0].name;
        console.log(res2.stockdetails[0].name);
    })

    fetch("http://localhost:3000/transaction").then((res)=>{
        return res.json();
    }).then((res2)=>{
        for(let i of res2){
            if(i.type==="BUY"){
                console.log(i);
                appendProduct(i.qty,i.price,i.timestamp);
            }
            else{
                appendProductSell(i.qty,i.price,i.timestamp);
            }
        }
    })
})()


let quantity = document.querySelector("#quantity");
let buy = document.querySelector("#buy-stock");
let sell = document.querySelector("#sell-stock");

buy.addEventListener("click",buyClickHandler)

sell.addEventListener("click",sellClickHandler)

let stockHistory = document.querySelector(".stock-history");


function appendProductSell(qty,price,timestamp){
    console.log(qty);
    let currentPrice = price;
    console.log(currentPrice);
    let timeStamp = timestamp;


    let sellStock = document.createElement("div");
    sellStock.classList.add("sell-stock");

    let sellDetails = document.createElement("div");
    sellDetails.classList.add("sell-details");

    let sellQtyStocks = document.createElement("div");
    sellQtyStocks.classList.add("sell-qty-stocks");

    let sellQty = document.createElement("div");
    sellQty.classList.add("sell-qty");
    sellQty.innerText=qty;

    let stocks = document.createElement("div");
    stocks.classList.add("stocks");
    stocks.innerText="stocks";

    let sellPrice = document.createElement("div");
    sellPrice.classList.add("sell-price");
    sellPrice.innerText=currentPrice+"$";

    sellQtyStocks.appendChild(sellQty)
    sellQtyStocks.appendChild(stocks)
    sellQtyStocks.appendChild(sellPrice)

    sellDetails.appendChild(sellQtyStocks);


    let date = document.createElement("div");
    date.classList.add("date");
    date.innerText=timeStamp;

    sellDetails.appendChild(date);

    sellStock.appendChild(sellDetails);

    let sellName = document.createElement("div");
    sellName.classList.add("sell-name");
    sellName.innerText="SELL";

    sellStock.appendChild(sellName);

    stockHistory.appendChild(sellStock);
}

function appendProduct(qty,price,timestamp){
    console.log(qty);
    let currentPrice = price;
    console.log(currentPrice);

    let timeStamp = timestamp;


    let buyStock = document.createElement("div");
    buyStock.classList.add("buy-stock");

    let buyDetails = document.createElement("div");
    buyDetails.classList.add("buy-details");

    let buyQtyStocks = document.createElement("div");
    buyQtyStocks.classList.add("buy-qty-stocks");

    let buyQty = document.createElement("div");
    buyQty.classList.add("buy-qty");
    buyQty.innerText=qty;

    let stocks = document.createElement("div");
    stocks.classList.add("stocks");
    stocks.innerText="stocks";

    let buyPrice = document.createElement("div");
    buyPrice.classList.add("buy-price");
    buyPrice.innerText=currentPrice+"$";

    buyQtyStocks.appendChild(buyQty)
    buyQtyStocks.appendChild(stocks)
    buyQtyStocks.appendChild(buyPrice)

    buyDetails.appendChild(buyQtyStocks);


    let date = document.createElement("div");
    date.classList.add("date");
    date.innerText=timeStamp;

    buyDetails.appendChild(date);

    buyStock.appendChild(buyDetails);

    let buyName = document.createElement("div");
    buyName.classList.add("buy-name");
    buyName.innerText="BUY";

    buyStock.appendChild(buyName);

    stockHistory.appendChild(buyStock);

}
function sellClickHandler(e){
    let qty = quantity.value;
    console.log(qty);
    let currentPrice = price.innerText;
    console.log(currentPrice);
    let timeStamp = new Date().toUTCString();


    fetch("http://localhost:3000/transaction",{
        method:"POST",

        body:JSON.stringify({
            qty: qty,
            price: currentPrice,
            timestamp: timeStamp,
            type:"SELL"
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((res)=>{
        return res.json();
    }).then((res2)=>{
        console.log(res2);
    })

    let sellStock = document.createElement("div");
    sellStock.classList.add("sell-stock");

    let sellDetails = document.createElement("div");
    sellDetails.classList.add("sell-details");

    let sellQtyStocks = document.createElement("div");
    sellQtyStocks.classList.add("sell-qty-stocks");

    let sellQty = document.createElement("div");
    sellQty.classList.add("sell-qty");
    sellQty.innerText=qty;

    let stocks = document.createElement("div");
    stocks.classList.add("stocks");
    stocks.innerText="stocks";

    let sellPrice = document.createElement("div");
    sellPrice.classList.add("sell-price");
    sellPrice.innerText=currentPrice+"$";

    sellQtyStocks.appendChild(sellQty)
    sellQtyStocks.appendChild(stocks)
    sellQtyStocks.appendChild(sellPrice)

    sellDetails.appendChild(sellQtyStocks);


    let date = document.createElement("div");
    date.classList.add("date");
    date.innerText=timeStamp;

    sellDetails.appendChild(date);

    sellStock.appendChild(sellDetails);

    let sellName = document.createElement("div");
    sellName.classList.add("sell-name");
    sellName.innerText="SELL";

    sellStock.appendChild(sellName);

    stockHistory.appendChild(sellStock);
}

function buyClickHandler(e){
    let qty = quantity.value;
    console.log(qty);
    let currentPrice = price.innerText;
    console.log(currentPrice);

    let timeStamp = new Date().toUTCString();

    fetch("http://localhost:3000/transaction",{
        method:"POST",

        body:JSON.stringify({
            qty: qty,
            price: currentPrice,
            timestamp: timeStamp,
            type:"BUY"
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((res)=>{
        return res.json();
    }).then((res2)=>{
        console.log(res2);
    })

    let buyStock = document.createElement("div");
    buyStock.classList.add("buy-stock");

    let buyDetails = document.createElement("div");
    buyDetails.classList.add("buy-details");

    let buyQtyStocks = document.createElement("div");
    buyQtyStocks.classList.add("buy-qty-stocks");

    let buyQty = document.createElement("div");
    buyQty.classList.add("buy-qty");
    buyQty.innerText=qty;

    let stocks = document.createElement("div");
    stocks.classList.add("stocks");
    stocks.innerText="stocks";

    let buyPrice = document.createElement("div");
    buyPrice.classList.add("buy-price");
    buyPrice.innerText=currentPrice+"$";

    buyQtyStocks.appendChild(buyQty)
    buyQtyStocks.appendChild(stocks)
    buyQtyStocks.appendChild(buyPrice)

    buyDetails.appendChild(buyQtyStocks);


    let date = document.createElement("div");
    date.classList.add("date");
    date.innerText=timeStamp;

    buyDetails.appendChild(date);

    buyStock.appendChild(buyDetails);

    let buyName = document.createElement("div");
    buyName.classList.add("buy-name");
    buyName.innerText="BUY";

    buyStock.appendChild(buyName);

    stockHistory.appendChild(buyStock);

}


socket.on("stock-update",(updprice)=>{
    let cv = parseFloat(price.innerText);
    let arrow = document.querySelector(".arrow");
    let difference = document.querySelector(".difference");

    let candleStickBox = document.querySelector(".candle-stick-box");


    if(cv>updprice){
        console.log("==========");
        arrow.innerHTML="&#2193";
        difference.style.color="#e03131";
        let add = document.createElement("div");
        add.style.backgroundColor="#e03131";
        add.style.height=`${cv-updprice}px`;
        console.log(cv-updprice);
        add.style.width="20px";
        candleStickBox.appendChild(add);
    }
    else{
        arrow.innerHTML="&#8593";
        difference.style.color="#2f9e44"
        let add = document.createElement("div");
        add.style.backgroundColor="#2f9e44";
        add.style.height= `${updprice-cv}px`;
        console.log(updprice-cv);
        add.style.width="20px";
        candleStickBox.appendChild(add);   
    }
    price.innerText=updprice;
})