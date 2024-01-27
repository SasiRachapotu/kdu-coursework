package com.caching.util;

import com.caching.dto.error.ErrorDto;
import com.caching.exception.InvalidAddressException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value= InvalidAddressException.class)
    public ResponseEntity<ErrorDto> invalidAddress(InvalidAddressException exception){
        log.debug("Error Occurred in InvalidAddressException");
        ErrorDto errorDto = new ErrorDto(exception.getMessage(), 404);
        return new ResponseEntity<>(errorDto,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDto> invalidMethodArguments(MethodArgumentNotValidException exception){
        log.debug("Error Occurred in MethodArgumentNotValidException");
        ErrorDto errorDto = new ErrorDto(exception.getMessage(),404);
        return new ResponseEntity<>(errorDto,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value=Exception.class)
    public ResponseEntity<ErrorDto> globalHandler(Exception exception){
        log.debug("Generalized exception");
        ErrorDto errorDto = new ErrorDto(exception.getClass().toString(),404);
        return new ResponseEntity<>(errorDto,HttpStatus.BAD_REQUEST);
    }
}
