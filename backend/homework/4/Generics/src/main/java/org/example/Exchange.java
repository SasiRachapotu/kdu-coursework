package org.example;

public class Exchange {

    private Exchange(){

    }
    public static <T> void swap (T[] array, int index1 ,int index2){
        Logging logging = new Logging();
        if (index1 >= 0 && index1 < array.length && index2 >= 0 && index2 < array.length) {
            T temp = array[index1];
            array[index1] = array[index2];
            array[index2] = temp;
        } else {
            logging.logString("Invalid indices for swapping");
        }

    }
}
