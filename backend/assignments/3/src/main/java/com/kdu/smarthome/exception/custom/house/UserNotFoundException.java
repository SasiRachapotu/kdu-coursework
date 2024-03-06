package com.kdu.smarthome.exception.custom.house;

public class UserNotFoundException extends RuntimeException{

    @Override
    public String toString() {
        return "User not found";
    }
}
