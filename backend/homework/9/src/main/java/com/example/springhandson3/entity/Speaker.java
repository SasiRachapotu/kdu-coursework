package com.example.springhandson3.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Speaker {

    private String brand;
    private double price;

    @Override
    public String toString() {
        return "Speaker{" +
                "brand='" + brand + '\'' +
                ", price=" + price +
                '}';
    }
}
