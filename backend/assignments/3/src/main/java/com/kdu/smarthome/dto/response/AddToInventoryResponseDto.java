package com.kdu.smarthome.dto.response;

import com.kdu.smarthome.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class AddToInventoryResponseDto {
    String message;
    Inventory inventory;
    HttpStatus httpStatus;
}
