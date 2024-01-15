package details;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Lists {
    public static List<Coin> coinDetails = new ArrayList<>();
    public static List<Trader> traderDetails = new ArrayList<>();

    public static HashMap<String,Double> portfolioValue = new HashMap<>();
    public static final List<Transaction> transactionDetails = new ArrayList<>();
    public static final HashMap<String, HashMap<String, Long>> transactionPortfolio = new HashMap<>();

    public static final HashMap<String, Coin> coinMap = new HashMap<>();
    public static final HashMap<String, Coin> coinNameMap = new HashMap<>();
}
