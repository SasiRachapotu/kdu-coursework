import { IAPITransactionSummary } from "./interface/ApiResponse";

export interface ISummarizedStock{
    company:string,
    symbol:string,
    buyObject:IUnitTransactionData,
    sellObject:IUnitTransactionData,
    profit:number,
}

export interface IUnitTransactionData{
    price:number,
    date:string,
}

self.onmessage = async (message: MessageEvent<any>) => {
    const apiResponse = message.data;
    const response: ISummarizedStock[] = [];
  
    apiResponse.map((stock: IAPITransactionSummary) => {
      const company = stock.company;
      const symbol = stock.symbol;
      const allData = stock.data;
  
      const allPricesofCompany: IUnitTransactionData[] = [];
  
      allData.forEach((daily) => {
        const { date, prices } = daily;
  
        prices.forEach((item) => {
          const priceItem = {
            price: item,
            date,
          };
  
          allPricesofCompany.push(priceItem);
        });
      });
  
      const dataSize = allPricesofCompany.length;
  
      if (dataSize === 0) {
        return;
      }
  
      let maxProfit = 0;
      let buyPrice = allPricesofCompany[0].price;
  
      let buyObject = {
        price: 0, 
        date: ''
      };
  
      let sellObject = {
        price: 0, 
        date: ''
      };
      
      let currBuyObject = allPricesofCompany[0];
  
      for (let i = 1; i < dataSize; i++) {
        const sellPrice = allPricesofCompany[i].price;
        const profit = sellPrice - buyPrice;
  
        if (profit > maxProfit) {
          sellObject = { ...allPricesofCompany[i] };
          buyObject = { ...currBuyObject };
          maxProfit = profit;
        }
  
        if (sellPrice < buyPrice) {
          buyPrice = sellPrice;
          currBuyObject = { ...allPricesofCompany[i] };
        }
      }
  
      response.push({
        company,
        symbol,
        buyObject,
        sellObject,
        profit: maxProfit,
      });
    });
  
    self.postMessage(response);
  
  };
  