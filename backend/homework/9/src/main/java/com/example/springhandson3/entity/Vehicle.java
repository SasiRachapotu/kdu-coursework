package com.example.springhandson3.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Vehicle {

    private Tyre tyre;
    private Speaker speaker;
    private double price;

    @Override
    public String toString() {
        return "Vehicle{" +
                "tyre=" + tyre +
                ", speaker=" + speaker +
                ", price=" + price +
                '}';
    }
}

