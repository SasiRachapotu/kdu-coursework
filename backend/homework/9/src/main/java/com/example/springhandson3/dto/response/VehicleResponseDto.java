package com.example.springhandson3.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VehicleResponseDto {
    String tyre;
    String speaker;
    double price;
}
