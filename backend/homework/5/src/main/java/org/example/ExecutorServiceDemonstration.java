package org.example;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceDemonstration {
    public static void main(String[] args) {
        ExecutorService senderExecutorService = Executors.newFixedThreadPool(3);
        ExecutorService receiverExecutorService= Executors.newFixedThreadPool(3);

        MessageQueue executorServiceMessageQueue = new MessageQueue();
        for(int i=0;i<3;i++){
            senderExecutorService.submit(new MessageSender(executorServiceMessageQueue));
        }for(int i=0;i<3;i++){
            receiverExecutorService.submit(new MessageReceiver(executorServiceMessageQueue));
        }

        senderExecutorService.shutdown();
        receiverExecutorService.shutdown();
    }
}
