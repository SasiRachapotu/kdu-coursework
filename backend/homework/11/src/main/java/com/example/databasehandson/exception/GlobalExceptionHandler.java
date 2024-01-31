package com.example.databasehandson.exception;

import com.example.databasehandson.dto.error.ErrorDto;
import com.example.databasehandson.exception.custom.EntityNotCreatedException;
import com.example.databasehandson.exception.custom.InvalidShiftTypeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = EntityNotCreatedException.class)
    public ResponseEntity<ErrorDto> entityNotCreatedException(EntityNotCreatedException entityNotCreatedException){
        return new ResponseEntity<>(new ErrorDto(entityNotCreatedException.getMessage(), 404),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = InvalidShiftTypeException.class)
    public ResponseEntity<ErrorDto> invalidShiftType(InvalidShiftTypeException invalidShiftTypeException){
        return new ResponseEntity<>(new ErrorDto(invalidShiftTypeException.getMessage(),404),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(value=Exception.class)
    public ResponseEntity<ErrorDto> globalException(Exception e){
        return new ResponseEntity<>(new ErrorDto(e.getMessage(),404),HttpStatus.BAD_REQUEST);
    }
}
