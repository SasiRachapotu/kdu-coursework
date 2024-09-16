package com.example.securitydemo.dto.error;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorDto {
    String message;
    int code;
}
