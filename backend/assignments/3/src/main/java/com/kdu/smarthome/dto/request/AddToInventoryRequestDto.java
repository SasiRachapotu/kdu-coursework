package com.kdu.smarthome.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddToInventoryRequestDto {
    // Json property used for mapping kickston_id with kickstonId
    @NotBlank(message = "kickston_id should not be blank")
    @JsonProperty("kickston_id")
    String kickstonId;
    // Json property used to map device_username with deviceUsername
    @NotBlank(message = "device_username should not be blank")
    @JsonProperty("device_username")
    String deviceUsername;
    // Json property used to map device_password with devicePassword
    @NotBlank(message = "device password should not be blank")
    @JsonProperty("device_password")
    String devicePassword;
    // Json property to map manufacture_date_time with manufacture_date_time
    @NotBlank(message = "manufacture date and time should not be blank")
    @JsonProperty("manufacture_date_time")
    LocalDateTime manufactureDateTime;
    // Json property to map manufacture_factory_place with manufactureFactoryPlace
    @NotBlank(message = "manufacture_factory_place should not be blank")
    @JsonProperty("manufacture_factory_place")
    String manufactureFactoryPlace;

}
