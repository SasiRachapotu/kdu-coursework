package com.example.securitydemo.controller;

import com.example.securitydemo.dto.auth.LoginDto;
import com.example.securitydemo.dto.auth.LoginResponseDto;
import com.example.securitydemo.service.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class AuthController {

    AuthenticationService authenticationService;

    @Autowired
    AuthController(AuthenticationService authenticationService){
        this.authenticationService=authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> singUp(@RequestBody LoginDto loginDto){
        authenticationService.signUp(loginDto);
        log.info("Signup Successful!!");
        return ResponseEntity.ok("Signup successful");
    }

    @GetMapping("/persons")
    public ResponseEntity<List<LoginResponseDto>> getAllPersons(){
        return new ResponseEntity<>(authenticationService.getAllPersons(), HttpStatus.ACCEPTED);
    }

    @GetMapping("/login")
    public ResponseEntity<String> getLogin(){
        return ResponseEntity.ok("Login successful");
    }
}
