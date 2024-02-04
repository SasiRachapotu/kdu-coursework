package com.kdu.smarthome.dto.response;

import com.kdu.smarthome.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class AddUserToHouseResponseDto {
    String message;
    Users user;
    HttpStatus code;
}
