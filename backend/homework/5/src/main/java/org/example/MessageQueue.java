package org.example;

import optional.Logging;

import java.util.ArrayDeque;

public class MessageQueue {

    private ArrayDeque<String> messages = new ArrayDeque<>();
    Logging logging = new Logging();
    public synchronized void addMessage(String message){
        messages.add(message);
        notifyAll();
    }

    public synchronized String getMessage(){
        while(messages.isEmpty()){
            try {
                wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                logging.logString("Error occured : "+e);
            }
        }
        String message = messages.poll();
        notifyAll();
        return message;
    }
}
