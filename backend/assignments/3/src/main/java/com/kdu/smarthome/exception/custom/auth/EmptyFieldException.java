package com.kdu.smarthome.exception.custom.auth;

public class EmptyFieldException extends RuntimeException{
    @Override
    public String toString() {
        return "All fields are mandatory to be filled";
    }
}
