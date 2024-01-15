package details;

public class Coin {

    long rank;
    String coin;
    String symbol;
    Double price;
    long quantity;

    public Coin(long rank, String coin, String symbol, Double price, long quantity) {
        this.rank = rank;
        this.coin = coin;
        this.symbol = symbol;
        this.price = price;
        this.quantity = quantity;
    }

    public long getRank() {
        return rank;
    }

    public void setRank(long rank) {
        this.rank = rank;
    }

    public String getName() {
        return coin;
    }

    public void setName(String name) {
        this.coin = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Coins{ " +
                " name='" + coin + '\'' +
                ", symbol='" + symbol + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                " }";
    }
}
