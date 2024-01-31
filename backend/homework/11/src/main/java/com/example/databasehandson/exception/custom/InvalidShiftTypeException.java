package com.example.databasehandson.exception.custom;

public class InvalidShiftTypeException extends RuntimeException{
    @Override
    public String toString() {
        return "Invalid Shift type specified..";
    }
}
