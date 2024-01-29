package com.example.securitydemo.controller;


import com.example.securitydemo.dto.request.UserRequestDto;
import com.example.securitydemo.dto.response.UserResponseDto;
import com.example.securitydemo.service.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {

    UserServiceImpl userService;

    @Autowired
    UserController(UserServiceImpl userService){
        this.userService=userService;
    }
    @GetMapping("")
    public ResponseEntity<List<UserResponseDto>> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.ACCEPTED);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody UserRequestDto userRequestDto){
        userService.addUser(userRequestDto);
        log.info("Successful adding user!!");
        return ResponseEntity.ok("User Added");
    }

    @GetMapping("{name}")
    public ResponseEntity<UserResponseDto> getUserByName(@PathVariable String name){
        return ResponseEntity.ok(userService.getByName(name));
    }
}
