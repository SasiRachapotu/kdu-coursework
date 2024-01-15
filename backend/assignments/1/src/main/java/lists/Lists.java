package lists;

import details.Coin;
import details.Trader;
import details.Transaction;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Lists {

    public static List<Coin> coinDetails = new ArrayList<>();
    public static List<Trader> traderDetails = new ArrayList<>();
    public static final List<Transaction> transactionList = new ArrayList<>();
    public static final HashMap<String, HashMap<String, Long>> transactionDetails =
            new HashMap<>();
}
