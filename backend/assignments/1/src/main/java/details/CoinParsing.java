package details;


import logger.Logging;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Comparator;
import java.util.List;

import static details.Lists.*;

public class CoinParsing {

    private CoinParsing(){}

    public static void loadCoins(){

        try
        {
            FileReader fr = new FileReader("src/main/resources/coins.csv");
            BufferedReader bufferedReader = new BufferedReader(fr);
            String entry;

            int count =0;

            while((entry = bufferedReader.readLine()) != null)
            {
               if(count !=0) {
                   String [] data = entry.split(",");

                   long rank = Long.parseLong(data[1]);
                   String name = data[2];
                   String symbol = data[3];
                   Double price = Double.parseDouble(data[4]);
                   long circulatingSupply = Long.parseLong(data[5]);

                   Coin coin = new Coin(rank, name, symbol, price, circulatingSupply);
                   coinDetails.add(coin);
               }
               count++;
            }


            for(Coin coin : coinDetails)
            {
                coinMap.put(coin.getSymbol(), coin);
                coinNameMap.put(coin.getName(), coin);
            }

            bufferedReader.close();
        }
        catch(Exception e)
        {
            Logging.logString(e.toString());
        }
    }

    public static void getCoinByName(String name){
        Logging.logString(coinNameMap.get(name).toString());
    }

    public static void getCoinByCode(String code){
        Logging.logString(coinMap.get(code).toString());
    }



    public static void topNCoins(int n){

        List<Coin> topNCoins = coinDetails.stream().sorted((coin1, coin2) -> {
            Double price1 = coin1.getPrice();
            Double price2 = coin2.getPrice();
            return Double.compare(price1, price2);
        }).limit(n).toList();

        Logging.logString(topNCoins.stream().toList().toString());
    }
}
