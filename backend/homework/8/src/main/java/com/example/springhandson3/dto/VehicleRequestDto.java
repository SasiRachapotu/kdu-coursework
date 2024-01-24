package com.example.springhandson3.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VehicleRequestDto {
    @NotBlank(message = "Tyre can not be blank")
    private String tyre;
    @NotBlank(message = "Speaker can not be blank")
    private String speaker;
    @NotBlank(message = "Location can not be blank")
    private String location;
}
