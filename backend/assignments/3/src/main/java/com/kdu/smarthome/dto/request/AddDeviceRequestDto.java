package com.kdu.smarthome.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddDeviceRequestDto {
    @NotBlank(message = "houseId should not be blank")
    String houseId;
    @NotBlank(message = "roomId should not be blank")
    String roomId;
    @NotBlank(message = "kickstonId should not be blank")
    String kickstonId;
}
