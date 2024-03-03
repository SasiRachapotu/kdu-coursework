export interface IAPIResponse {
    stock_name:   string;
    stock_symbol: string;
    base_price:   number;
}

export interface IAPITransactionSummary {
    company: string;
    symbol:  string;
    data:    Datum[];
}

export interface Datum {
    date:   string;
    prices: number[];
}

