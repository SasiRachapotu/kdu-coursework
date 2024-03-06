package com.kdu.smarthome.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddUserToHouseRequestDto {
    @NotBlank(message = "username should not be blank")
    String username;
}
