package com.kdu.smarthome.exception;

import com.kdu.smarthome.dto.error.ErrorDto;
import com.kdu.smarthome.exception.custom.auth.EmptyFieldException;
import com.kdu.smarthome.exception.custom.device.DeviceAlreadyRegisteredException;
import com.kdu.smarthome.exception.custom.device.UnavailableDeviceException;
import com.kdu.smarthome.exception.custom.house.HouseNotFoundException;
import com.kdu.smarthome.exception.custom.house.UnauthorizedUserException;
import com.kdu.smarthome.exception.custom.house.UserNotFoundException;
import com.kdu.smarthome.exception.custom.room.InvalidRoomException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Empty field exception handled
    @ExceptionHandler(value = EmptyFieldException.class)
    public ResponseEntity<ErrorDto> handleEmptyFieldException(EmptyFieldException emptyFieldException){
        return new ResponseEntity<>(new ErrorDto("Empty field",400), HttpStatus.BAD_REQUEST);
    }

    // Handling User not found exception, handles all the exceptions at what ever place the  username is not found in database
    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<ErrorDto> handleUserNotFoundException(UserNotFoundException userNotFoundException){
        return new ResponseEntity<>(new ErrorDto("User not found!!",404), HttpStatus.BAD_REQUEST);
    }

    // Handling unauthorized user exception, places wherever the user not have the authorized to do the operation this handles the exception
    @ExceptionHandler(value = UnauthorizedUserException.class)
    public ResponseEntity<ErrorDto> unauthorizedExceptionHandler(UnauthorizedUserException unauthorizedUserException){
        return new ResponseEntity<>(new ErrorDto("Unauthorized user",401), HttpStatus.UNAUTHORIZED);
    }

    // Handles the exception where the house is not found with that particular id or so
    @ExceptionHandler(value = HouseNotFoundException.class)
    public ResponseEntity<ErrorDto> handleHouseNotFound(HouseNotFoundException houseNotFoundException){
        return new ResponseEntity<>(new ErrorDto("House not found!!",404),HttpStatus.NOT_FOUND);
    }

    // Handles the exception where the device is already registered and the new user wants to register the same device
    @ExceptionHandler(value = DeviceAlreadyRegisteredException.class)
    public ResponseEntity<ErrorDto> handleDeviceAlreadyRegisteredException(DeviceAlreadyRegisteredException deviceAlreadyRegisteredException){
        return new ResponseEntity<>(new ErrorDto("Device Already Registered",400),HttpStatus.BAD_REQUEST);
    }

    // Handles the unavailable device exception where ever caused, where device is unavailable
    @ExceptionHandler(value = UnavailableDeviceException.class)
    public ResponseEntity<ErrorDto> handleUnavailableDeviceException(UnavailableDeviceException unavailableDeviceException){
        return new ResponseEntity<>(new ErrorDto("Unavailable device",400),HttpStatus.BAD_REQUEST);
    }

    // when the id for the room is invalid, this handles the exception
    @ExceptionHandler(value = InvalidRoomException.class)
    public ResponseEntity<ErrorDto> handleInvalidRoomException(InvalidRoomException invalidRoomException){
        return new ResponseEntity<>(new ErrorDto("Invalid room ",400),HttpStatus.BAD_REQUEST);
    }

    // when the field are invalid like id expects long and if string is given that can't be parsed to long so this handles the exception
    @ExceptionHandler(value=NumberFormatException.class)
    public ResponseEntity<ErrorDto> handleInvalidField(NumberFormatException numberFormatException){
        return new ResponseEntity<>(new ErrorDto("Invalid Id's or fields",400),HttpStatus.BAD_REQUEST);
    }

    // when the method arguments are invalid as we have applied validations on the DTO's, this exception handling is necessary
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDto> handleInvalidMethodArgument(MethodArgumentNotValidException methodArgumentNotValidException){
        return new ResponseEntity<>(new ErrorDto("The arguments given are invalid please check again",400),HttpStatus.BAD_REQUEST);
    }

    // At the end if any exception is not handled this will handle all
    @ExceptionHandler(value =Exception.class)
    public ResponseEntity<ErrorDto> handleGlobalException(Exception exception){
        return new ResponseEntity<>(new ErrorDto("Global Exception handled!!",400),HttpStatus.BAD_REQUEST);
    }

}
