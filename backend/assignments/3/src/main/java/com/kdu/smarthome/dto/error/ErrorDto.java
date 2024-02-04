package com.kdu.smarthome.dto.error;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorDto {
    // Error dto maintained for all the exceptions
    String message;
    int status;
}
