package org.example;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

       MessageQueue messageQueue = new MessageQueue();

       for(int i=0;i<3;i++){
           MessageSender messageSender = new MessageSender(messageQueue);
           Thread thread = new Thread(messageSender);
           thread.setName("Thread "+i);
           thread.start();
           MessageReceiver messageReceiver = new MessageReceiver(messageQueue);
           Thread thread1 = new Thread(messageReceiver);
           thread1.start();
       }

    }
}