package com.kdu.smarthome.dto.response;

import com.kdu.smarthome.entity.Device;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class DeviceRegisterResponseDto {
    String message;
    Device device;
    HttpStatus httpStatus;
}
