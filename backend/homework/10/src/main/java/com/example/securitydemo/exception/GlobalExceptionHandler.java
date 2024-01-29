package com.example.securitydemo.exception;

import com.example.securitydemo.dto.error.ErrorDto;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = UsernameNotFoundException.class)
    public ErrorDto userNotFound(UsernameNotFoundException usernameNotFoundException){
        return new ErrorDto("Sorry!! user not found, please login",404);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ErrorDto methodArgumentNotFound(MethodArgumentNotValidException ex){
        return new ErrorDto("Your entries are invalid!! please try again..",404);
    }

    @ExceptionHandler(value = Exception.class)
    public ErrorDto globalException(Exception ex){
        return new ErrorDto("Exception occurred: "+ex,404);
    }

}
