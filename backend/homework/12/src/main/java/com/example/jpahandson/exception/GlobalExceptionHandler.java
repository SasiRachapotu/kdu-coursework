package com.example.jpahandson.exception;

import com.example.jpahandson.dto.error.ErrorDto;
import com.example.jpahandson.exception.custom.UserShiftNotFound;
import org.postgresql.util.PSQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = PSQLException.class)
    public ResponseEntity<ErrorDto> handlePSQLException(PSQLException psqlException){
        return new ResponseEntity<>(new ErrorDto(psqlException.getMessage(),404), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = UserShiftNotFound.class)
    public ResponseEntity<ErrorDto> handleUserShiftNotFound(UserShiftNotFound userShiftNotFound){
        return new ResponseEntity<>(new ErrorDto(userShiftNotFound.getMessage(),404),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value= Exception.class)
    public ResponseEntity<ErrorDto> handleGlobalException(Exception exception){
        return new ResponseEntity<>(new ErrorDto(exception.getMessage(),400),HttpStatus.BAD_REQUEST);
    }
}
