package details;

import logger.Logging;

import java.util.HashMap;
import java.util.Random;

import static details.Lists.coinMap;
import static details.Lists.transactionPortfolio;

public class Transaction {

    String type;

    private String coin;
    private long quantity;
    private String walletAddress;

    String hash;

    public String getCoin() {
        return coin;
    }

    public void setCoin(String coin) {
        this.coin = coin;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Long getVolume() {
        return volume;
    }

    public void setVolume(Long volume) {
        this.volume = volume;
    }

    private Double price;
    private Long volume;

    private String getBlockHash() {

        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder transactionHash = new StringBuilder();
        Random rnd = new Random();

        for (double i = 0; i < 199999999; i++) {
            i = i;
        }

        while (transactionHash.length() < 128) {
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            transactionHash.append(SALTCHARS.charAt(index));
        }

        String hashCode = transactionHash.toString();
        return "0x" + hashCode.toLowerCase();
    }
    public Transaction(String type, String coin, long quantity, String walletAddress) {
        this.type =type;
        this.coin = coin;
        this.quantity = quantity;
        this.walletAddress = walletAddress;
        hash=getBlockHash();
    }

    public Transaction(String type, String coin, Double price){
        this.type=type;
        this.coin=coin;
        this.price=price;
        hash=getBlockHash();
    }

    public Transaction(String type,String coin, Long volume){
        this.type=type;
        this.coin=coin;
        this.volume=volume;
        hash=getBlockHash();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void buyingTransaction() throws InterruptedException {

        synchronized (transactionPortfolio) {

            try {
                HashMap<String, Long> temp = new HashMap<>();

                if(!coinMap.containsKey(coin)){
                    while(!coinMap.containsKey(coin)){
                        transactionPortfolio.wait();
                    }
                    Coin coinObject = coinMap.get(coin);
                    if(coinObject.getQuantity()<quantity){
                        while (coinObject.getQuantity() < quantity){
                            transactionPortfolio.wait();
                        }
                    }
                }

                Coin coin1= coinMap.get(coin);
                if(transactionPortfolio.containsKey(walletAddress)){

                    temp = transactionPortfolio.get(walletAddress);

                    long currQuantity = quantity;

                    if(temp.containsKey(coin)){
                        currQuantity += temp.get(coin);
                    }

                    temp.put(coin, currQuantity);
                    transactionPortfolio.put(walletAddress, temp);
                }
                else{
                    temp.put(coin, quantity);
                    transactionPortfolio.put(walletAddress, temp);
                }

                coin1.setQuantity(coin1.getQuantity() - quantity);
                Lists.portfolioValue.put(walletAddress,Lists.portfolioValue.getOrDefault(walletAddress,0.0)-quantity*coin1.price);
                transactionPortfolio.notifyAll();

                Logging.logString(Thread.currentThread().getName() +  " Buying done " + transactionPortfolio);

            }
            catch(Exception e){
                Logging.logString(e.toString());
            }
        }
    }

    public void sellingTransaction() throws InterruptedException {

        synchronized (transactionPortfolio){

            Coin coin1 = coinMap.get(coin);

                while (!transactionPortfolio.containsKey(walletAddress)) {
                    transactionPortfolio.wait();
                }

                    while(!transactionPortfolio.get(walletAddress).containsKey(coin))
                    {
                        transactionPortfolio.wait();
                    }

                while (transactionPortfolio.get(walletAddress).get(coin) < quantity) {
                    transactionPortfolio.wait();
                }

            long updatedQuantity = transactionPortfolio.get(walletAddress).get(coin) - quantity;
            Lists.portfolioValue.put(walletAddress,Lists.portfolioValue.getOrDefault(walletAddress,0.0)-quantity*coin1.price);
            HashMap<String, Long> temp = transactionPortfolio.get(walletAddress);
            temp.put(coin, updatedQuantity);
            transactionPortfolio.put(walletAddress, temp);

            coin1.setQuantity(coin1.getQuantity() + quantity);
            transactionPortfolio.notifyAll();

        }
        Logging.logString(Thread.currentThread().getName() + " Selling Done " + transactionPortfolio);
    }

    public synchronized void updatePriceTransaction() {

        synchronized (coinMap){

            Coin coin1 = coinMap.get(this.coin);
            coin1.setPrice(price);
            coinMap.notifyAll();
        }

        Logging.logString(Thread.currentThread().getName() + " Updating done " + coinMap.get(coin));
    }

    public synchronized void updateVolumeTransaction() {

        synchronized (coinMap){
            Coin coin1 = coinMap.get(coin);
            coin1.setQuantity(coin1.getQuantity() + volume);
            notifyAll();
        }
        Logging.logString(Thread.currentThread().getName() + " Volume Update done " + coinMap.get(coin));
    }

}


