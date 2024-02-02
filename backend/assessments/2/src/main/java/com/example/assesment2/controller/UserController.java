package com.example.assesment2.controller;

import com.example.assesment2.dto.request.UserRequestDto;
import com.example.assesment2.entity.Address;
import com.example.assesment2.entity.Users;
import com.example.assesment2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    UserService userService;
    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }
    @PostMapping("")
    public ResponseEntity<Users> adduser(@RequestBody UserRequestDto userRequestDto){
       return ResponseEntity.ok(userService.addUser(userRequestDto));
    }

    @GetMapping("")
    public  ResponseEntity<List<Users>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Integer id,@RequestBody Users user){
        userService.updateUserById(id,user);
        return ResponseEntity.ok("Update successful");
    }


    @PutMapping("/addAddress/{id}")
    public ResponseEntity<String> addAddress(@PathVariable Integer id, @RequestBody Address address){
        userService.addAddress(id,address);
        return ResponseEntity.ok("Address added to given user");
    }

    @PutMapping("/updateAddress")
    public ResponseEntity<String> updateAddress(@RequestParam Integer userId, @RequestParam Integer addressId, @RequestBody Address address){
        userService.updateAddress(addressId,address);
        return ResponseEntity.ok("Updated Address successfully");
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(){
        return ResponseEntity.ok("Login successful");
    }

}
