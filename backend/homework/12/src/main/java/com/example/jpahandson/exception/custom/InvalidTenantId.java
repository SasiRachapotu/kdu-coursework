package com.example.jpahandson.exception.custom;

public class InvalidTenantId extends RuntimeException{
    @Override
    public String toString() {
        return "Invalid tenant Id: further process stopped and rollback initiated";
    }
}
