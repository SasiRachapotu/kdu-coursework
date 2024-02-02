package com.example.assesment2.exception;

import com.example.assesment2.dto.error.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ErrorDto> handleGlobalException(Exception ex){
        return new ResponseEntity<>(new ErrorDto(ex.getMessage(),404), HttpStatus.BAD_REQUEST);
    }
}
