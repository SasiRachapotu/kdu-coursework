package com.kdu.smarthome.dto.response;

import com.kdu.smarthome.entity.House;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class AddHouseResponseDto {
    String message;
    House house;
    HttpStatus httpStatus;
}
