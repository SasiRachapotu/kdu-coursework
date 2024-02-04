package com.kdu.smarthome.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddRoomRequestDto {
    // Json property for mapping roomName with room_name
    @NotBlank(message = "room_name should not be blank")
    @JsonProperty("room_name")
    String roomName;
}
