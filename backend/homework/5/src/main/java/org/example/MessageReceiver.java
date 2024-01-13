package org.example;

import optional.Logging;

public class MessageReceiver implements Runnable {

    Logging logging = new Logging();
    MessageQueue messageQueue;
    public MessageReceiver(MessageQueue messageQueue){
        this.messageQueue = messageQueue;
    }
    @Override
    public void run() {
        for(int i=0;i<5;i++){
            String message = messageQueue.getMessage();
            logging.logString(message);
        }
    }
}
