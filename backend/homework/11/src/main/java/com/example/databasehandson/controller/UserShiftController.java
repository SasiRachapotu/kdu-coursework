package com.example.databasehandson.controller;

import com.example.databasehandson.dto.request.UserShiftDto;
import com.example.databasehandson.service.ShiftUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserShiftController {
    ShiftUserService shiftsService;

    @Autowired
    public UserShiftController(ShiftUserService shiftsService){
        this.shiftsService=shiftsService;
    }

    @PostMapping("/shiftuser")
    public ResponseEntity<String> addShiftUser(@RequestBody UserShiftDto userShiftDto){
        shiftsService.addShiftUser(userShiftDto);
        return ResponseEntity.ok("User shift added...");
    }
}
