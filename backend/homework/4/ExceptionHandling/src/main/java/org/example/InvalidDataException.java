package org.example;

public class InvalidDataException extends RuntimeException{

    final Exception EXCEPTION;
    InvalidDataException(Exception exception){
        this.EXCEPTION = exception;
    }

    @Override
    public String toString() {
        return "InvalidDataException{" +
                "exception=" + EXCEPTION +
                '}';
    }
}

