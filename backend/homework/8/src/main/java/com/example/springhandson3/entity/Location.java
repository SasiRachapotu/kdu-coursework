package com.example.springhandson3.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Location {
    private String place;
    private double transportPercentage;
}
