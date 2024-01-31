package com.example.databasehandson.exception.custom;

public class EntityNotCreatedException extends RuntimeException{
    final String message;
    public EntityNotCreatedException(String message){
        this.message=message;
    }

    @Override
    public String toString() {
        return message;
    }
}
