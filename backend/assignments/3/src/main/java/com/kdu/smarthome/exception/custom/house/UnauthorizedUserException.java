package com.kdu.smarthome.exception.custom.house;

public class UnauthorizedUserException extends RuntimeException{
    @Override
    public String toString() {
        return "The User is unauthorized";
    }
}
