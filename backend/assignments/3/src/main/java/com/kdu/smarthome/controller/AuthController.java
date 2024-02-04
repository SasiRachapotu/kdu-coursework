package com.kdu.smarthome.controller;

import com.kdu.smarthome.dto.request.RegisterRequestDto;
import com.kdu.smarthome.dto.response.RegisterResponseDto;
import com.kdu.smarthome.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    AuthService authService;

    @Autowired
    public AuthController(AuthService authService){
        this.authService=authService;
    }

    /**
     * This route id for user registration
     * @param registerRequestDto takes username,password,name,firstname,lastname
     * @return register request dto which contains success message and jwt token
     */
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> registerUser(@RequestBody RegisterRequestDto registerRequestDto){
        return ResponseEntity.ok(authService.registerUser(registerRequestDto));
    }
}
