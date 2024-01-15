import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import details.*;
import logger.Logging;

import java.util.Scanner;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;


public class Main {

    public static void executeTransactions(JsonNode jsonTransactions, CountDownLatch latch) throws InterruptedException {

        CoinParsing.loadCoins();

        TraderParsing.loadTraders();

        ExecutorService executorService = Executors.newFixedThreadPool(jsonTransactions.size());

        for(int i=0;i<jsonTransactions.size();i++){

            String type = jsonTransactions.get(i).get("type").textValue();
            if(type.equals("BUY")){
                String coin = jsonTransactions.get(i).get("data").get("coin").textValue();
                Long quantity = jsonTransactions.get(i).get("data").get("quantity").asLong();
                String wallet = jsonTransactions.get(i).get("data").get("wallet_address").textValue();

                executorService.execute(new ExecuteTransaction(new Transaction(type,coin,quantity,wallet),latch));
            }
            else if(type.equals("SELL")){
                String coin = jsonTransactions.get(i).get("data").get("coin").textValue();
                Long quantity = jsonTransactions.get(i).get("data").get("quantity").asLong();
                String wallet = jsonTransactions.get(i).get("data").get("wallet_address").textValue();

                executorService.execute(new ExecuteTransaction(new Transaction(type,coin,quantity,wallet), latch));
            }
            else if(type.equals("ADD_VOLUME")){
                String coin = jsonTransactions.get(i).get("data").get("coin").textValue();
                Long volume =jsonTransactions.get(i).get("data").get("volume").asLong();
                executorService.execute(new ExecuteTransaction(new Transaction(type, coin, volume), latch));
            }
            else if(type.equals("UPDATE_PRICE")){
                String coin = jsonTransactions.get(i).get("data").get("coin").textValue();
                Double volume = jsonTransactions.get(i).get("data").get("price").asDouble();
                executorService.execute(new ExecuteTransaction(new Transaction(type, coin,volume), latch));
            }
            else{
                Logging.logString("Error Type: unmatched");
                latch.countDown();
            }

        }

        executorService.shutdown();

    }



    public static void main(String[] args) throws JsonProcessingException, InterruptedException {

        JsonNode jsonTransactions = TransactionsParsing.loadTransactions();
        CountDownLatch latch = new CountDownLatch(jsonTransactions.size());

        executeTransactions(jsonTransactions, latch);


        latch.await(3, TimeUnit.SECONDS);

        Logging.logString("Current Latch count: "+latch.getCount());
        Logging.logString("Transactions Executed...");

        // User Driven Program

        Scanner sc = new Scanner(System.in);
        Logging.logString("Please enter a choice: \n");
        int choice = 0;

        do {
            Logging.logString("1. Enter name of the coin :");
            Logging.logString("2. Enter code of the coin :");
            Logging.logString("3. top N coins in the market :");
            Logging.logString("4. Trader Portfolio");
            Logging.logString("5. Protfolio value");
            Logging.logString("6. Top 5 traders");
            Logging.logString("7. Bottom 5 traders");
            Logging.logString("8. Exit");
            choice = sc.nextInt();

            switch(choice){
                case 1:
                    Logging.logString("Enter name: ");
                    sc.nextLine();
                    String name = sc.next();
                    CoinParsing.getCoinByName(name);
                    break;
                case 2:
                    Logging.logString("Enter coin code: ");
                    sc.nextLine();
                    String code = sc.next();
                    CoinParsing.getCoinByCode(code);
                    break;
                case 3:
                    Logging.logString("Enter n: ");
                    int n = sc.nextInt();
                    Logging.logString("Top N coins: ");
                    CoinParsing.topNCoins(n);
                    break;
                case 4:
                    Logging.logString("Enter wallet: ");
                    sc.nextLine();
                    String wallet = sc.next();
                    TraderParsing.traderPortfolio(wallet);
                    break;
                case 5:
                    Logging.logString("Enter wallet: ");
                    sc.nextLine();
                    wallet = sc.next();
                    Logging.logString("The portfolio value :"+Lists.portfolioValue.get(wallet));
                    break;
                case 6:
                    Logging.logString("Top5: ");
                    TraderParsing.top5Traders();
                    break;
                case 7:
                    Logging.logString("Bottom5: ");
                    TraderParsing.bottom5Traders();
                    break;
                case 8:
                    Logging.logString("Exit==============Thank you");
                    break;
                default:
                    Logging.logString("Enter a valid entry: ");
                    break;
            }

        }while(choice!=8);
        CoinParsing.getCoinByName("Bitcoin");
        CoinParsing.getCoinByCode("ETH");
        CoinParsing.topNCoins(5);

    }
}
