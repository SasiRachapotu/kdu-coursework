package optional;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static int factorial(int num){
        int fact=1;
        for(int i=1;i<=num;i++){
            fact*=i;
        }
        return fact;
    }

    public static List<Integer> factors(int num){
        ArrayList<Integer> arrayList=new ArrayList<>();
        for(int i=1;i<=num;i++){
            if(num%i==0){
                arrayList.add(i);
            }
        }
        return arrayList;
    }
    public static void main(String[] args) {

        Logging logging = new Logging();

        // Use of lambda function
        Thread factorial = new Thread(()-> logging.logString(Integer.toString(factorial(25))));

        // Use of streams and lambda function
        Thread factors = new Thread(()->
            logging.logString(factors(50).stream().reduce("",(str,n)->str +n+" ",String::concat))
        );

        factorial.start();
        factors.start();

        try {
            // To make sure main ends after threads
            factors.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        logging.logString("Inside Main");
    }

}
