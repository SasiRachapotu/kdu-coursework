package org.example;


import optional.Logging;

public class MessageSender implements Runnable {

    Logging logging = new Logging();
    MessageQueue messageQueue;
    MessageSender(MessageQueue messageQueue){
        this.messageQueue=messageQueue;
    }

    @Override
    public void run() {
        for(int i=0;i<5;i++){
            String message = Thread.currentThread().getName()+"- message by "+i;
            messageQueue.addMessage(message);
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                logging.logString("Error occured : "+e);
            }
        }
    }
}
