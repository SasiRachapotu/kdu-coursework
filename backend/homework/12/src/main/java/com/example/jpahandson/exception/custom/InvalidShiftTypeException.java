package com.example.jpahandson.exception.custom;

public class InvalidShiftTypeException extends RuntimeException{
    @Override
    public String toString() {
        return "Invalid Shift type specified..";
    }
}
