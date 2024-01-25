package com.example.springhandson3.entity;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Tyre {

    private String brand;
    private double price;

    @Override
    public String toString() {
        return "Tyre{" +
                "brand='" + brand + '\'' +
                ", price=" + price +
                '}';
    }
}

