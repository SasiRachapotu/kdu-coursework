package org.example;

import details.Transaction;
import logger.Logging;

import java.util.concurrent.CountDownLatch;

public class ExecuteTransaction implements Runnable{

    Transaction transaction;
    CountDownLatch latch;

    public ExecuteTransaction(Transaction transaction, CountDownLatch latch){
        this.transaction = transaction;
        this.latch = latch;
    }


    @Override
    public void run() {

        try {

            if(transaction.getType().equals("BUY")){
                transaction.buyingTransaction();
                latch.countDown();
            }
            else if(transaction.getType().equals("SELL")){
                transaction.sellingTransaction();
                latch.countDown();
            }
            else if(transaction.getType().equals("ADD_VOLUME")){
                transaction.updateVolumeTransaction();
                latch.countDown();
            }
            else if(transaction.getType().equals("UPDATE_PRICE")){
                transaction.updatePriceTransaction();
                latch.countDown();
            }
            else{
                Logging.logString(Thread.currentThread().getName() + " Not a valid type");
            }

        }
        catch (InterruptedException e) {
            Logging.logString(e.toString());
            Thread.currentThread().interrupt();
        }

    }
}

