package com.example.databasehandson.controller;

import com.example.databasehandson.dto.request.UserRequestDto;
import com.example.databasehandson.entity.Users;
import com.example.databasehandson.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    UserService userService;
    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }
    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody UserRequestDto userRequestDto){
        userService.addUser(userRequestDto,userRequestDto.getTenantName());
        return ResponseEntity.ok("Successful added user: ");
    }

    @GetMapping("/users/{name}")
    public ResponseEntity<Users> getUser(@PathVariable String name){
        return ResponseEntity.ok(userService.getUser(name));
    }

    @GetMapping("users/all")
    public ResponseEntity<List<Users>> getAllusers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
