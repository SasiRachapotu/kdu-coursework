package com.kdu.smarthome.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddHouseRequestDto {
    @NotBlank(message = "address should not be blank")
    String address;
    // Json property used for mapping the request body key name with this parameter
    @NotBlank(message = "house name should not be blank")
    @JsonProperty("house_name")
    String homeName;
}
