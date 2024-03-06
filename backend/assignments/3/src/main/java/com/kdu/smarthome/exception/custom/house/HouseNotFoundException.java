package com.kdu.smarthome.exception.custom.house;

public class HouseNotFoundException extends RuntimeException{
    @Override
    public String toString() {
        return "House not found!!";
    }
}
