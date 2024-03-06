package com.kdu.smarthome.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeviceRegisterRequestDto {
    // Json property to map kickston_id to kickstonId
    @NotBlank(message = "kickston_id should not be blank")
    @JsonProperty("kickston_id")
    String kickstonId;

    // Json property to map device_username to deviceUserName
    @NotBlank(message = "device username should not be blank")
    @JsonProperty("device_username")
    String deviceUserName;

    // Json property to map device_password with password
    @NotBlank(message = "password should not be blank")
    @JsonProperty("device_password")
    String password;
}
