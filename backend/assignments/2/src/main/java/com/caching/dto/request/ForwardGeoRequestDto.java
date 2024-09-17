package com.caching.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ForwardGeoRequestDto {
    @NotBlank(message = "Address is mandatory")
    String address;
}
