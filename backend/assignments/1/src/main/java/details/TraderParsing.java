package details;

import logger.Logging;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.*;

import static details.Lists.traderDetails;

public class TraderParsing {
    private TraderParsing(){}

    public static void loadTraders(){

        try(BufferedReader bufferedReader = new BufferedReader(new FileReader("src/main/resources/traders.csv")))
        {

            String line;

            int count =0;

            while((line = bufferedReader.readLine()) != null)
            {
                if(count !=0) {
                    List<String> lineData = Arrays.asList(line.split(","));

                    String firstName = lineData.get(1);
                    String lastName = lineData.get(2);
                    String phone = lineData.get(3);
                    String walletAddress = lineData.get(4);

                    Trader trader = new Trader(firstName, lastName, phone, walletAddress);
                    traderDetails.add(trader);
                    Lists.portfolioValue.put(walletAddress,0.0);
                }
                count++;
            }

        }
        catch(Exception e)
        {
            Logging.logString(e.toString());
        }
    }

    public static void traderPortfolio(String wallet){
        Logging.logString(Lists.transactionPortfolio.get(wallet).toString());
    }

    public static void top5Traders(){
        List<Map.Entry<String, Double> > list = new LinkedList<> (Lists.portfolioValue.entrySet());

        Collections.sort(list, (stringDoubleEntry, t1) -> (t1.getValue()).compareTo(stringDoubleEntry.getValue()));

        for(int i=0;i<5;i++){
            Logging.logString(list.get(i).toString());
        }
    }

    public static void bottom5Traders(){
        List<Map.Entry<String, Double> > list = new LinkedList<> (Lists.portfolioValue.entrySet());

        Collections.sort(list, Comparator.comparing(Map.Entry::getValue));

        for(int i=0;i<5;i++){
            Logging.logString(list.get(i).toString());
        }
    }

}
