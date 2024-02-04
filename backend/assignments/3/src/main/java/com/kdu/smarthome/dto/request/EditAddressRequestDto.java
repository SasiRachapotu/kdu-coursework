package com.kdu.smarthome.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EditAddressRequestDto {
    @NotBlank(message = "address should not be blank")
    String address;
}
