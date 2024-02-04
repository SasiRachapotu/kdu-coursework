package com.kdu.smarthome.dto.response;

import com.kdu.smarthome.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class AddRoomResponseDto {
    String message;
    Room room;
    HttpStatus httpStatus;
}
