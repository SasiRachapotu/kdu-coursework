package com.kdu.smarthome.dto.response;

import com.kdu.smarthome.entity.House;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class EditAddressResponseDto {
    String message;
    House house;
    HttpStatus httpStatus;
}
