package com.example.jpahandson.controller;

import com.example.jpahandson.dto.request.UserPutDto;
import com.example.jpahandson.model.User;
import com.example.jpahandson.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/users")
public class UserController {
    UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping("")
    public ResponseEntity<Page<User>> getAllusers(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "50") int size){
        return new ResponseEntity<>(userService.getAllUsers(page,size), HttpStatus.ACCEPTED);
    }

    @PostMapping("")
    public ResponseEntity<String> addUser(@RequestBody User user){
        userService.addUser(user);
        return new ResponseEntity<>("User added successfully",HttpStatus.ACCEPTED);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> edituser(@PathVariable UUID id , @RequestBody UserPutDto userPutDto){
        userService.editUser(id,userPutDto.getUsername());
        return new ResponseEntity<>("Edit successful",HttpStatus.ACCEPTED);
    }
}
