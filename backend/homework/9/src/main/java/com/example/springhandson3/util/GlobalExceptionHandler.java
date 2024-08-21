package com.example.springhandson3.util;


import com.example.springhandson3.dto.error.ErrorDto;
import com.example.springhandson3.exception.InvalidVehicleCreationException;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = IndexOutOfBoundsException.class)
    public ResponseEntity<ErrorDto> noSuchVehicle(IndexOutOfBoundsException exception){
        ErrorDto error = new ErrorDto("No such vehicle found "+exception,403);
        log.error("Error: Index Out of bound Exception");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = InvalidVehicleCreationException.class)
    public ResponseEntity<ErrorDto> errorCreation(InvalidVehicleCreationException exception){
        ErrorDto error = new ErrorDto("Can't create this Vehicle: "+exception,403);
        log.error("Error: Invalid Vehicle Creating request");
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = BadRequestException.class)
    public  ResponseEntity<ErrorDto> badRequest(BadRequestException exception){
        ErrorDto error = new ErrorDto("Bad request exception: "+exception,400);
        log.error("Error: Bad request execption");
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDto> methodArgumentNotFound(MethodArgumentNotValidException exception){
        ErrorDto error = new ErrorDto("Method arguments are invalid:) ",403);
        log.error("Error: Method argument not found exception");
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value= Exception.class)
    public ResponseEntity<ErrorDto> globalException(Exception exception){
        ErrorDto error = new ErrorDto("Global Exception occurred: "+exception,404);
        log.error("Error: Global exception occurred");
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
