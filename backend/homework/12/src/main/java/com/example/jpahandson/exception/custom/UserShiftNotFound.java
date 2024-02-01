package com.example.jpahandson.exception.custom;

public class UserShiftNotFound extends RuntimeException{
    @Override
    public String toString() {
        return "User shift not found";
    }
}
