package com.example.springhandson3.exception;


import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InvalidVehicleCreationException extends RuntimeException{
    private final String tyre;
    private final String location;
    private final String speaker;

    @Override
    public String toString() {
        return String.format("This vehicle with %s tyre, %s location, %s speaker can not be created",tyre,location,speaker);
    }
}
