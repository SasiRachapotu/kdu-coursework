package details;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Lists {
    private Lists(){

    }
    public static final List<Coins> coinDetails = new ArrayList<>();
    public static final List<Trader> traderDetails = new ArrayList<>();

    public static final HashMap<String,Double> portfolioValue = new HashMap<>();
    public static final List<Transaction> transactionDetails = new ArrayList<>();
    public static final HashMap<String, HashMap<String, Long>> transactionPortfolio = new HashMap<>();

    public static final HashMap<String, Coins> coinMap = new HashMap<>();
    public static final HashMap<String, Coins> coinNameMap = new HashMap<>();
}
