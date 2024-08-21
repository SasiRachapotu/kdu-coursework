package com.example.jpahandson.controller;

import com.example.jpahandson.model.ShiftUser;
import com.example.jpahandson.service.ShiftUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/shiftuser")
public class ShiftUserController {
    ShiftUserService shiftUserService;

    @Autowired
    public ShiftUserController(ShiftUserService shiftUserService){
        this.shiftUserService=shiftUserService;
    }
    @GetMapping("")
    public ResponseEntity<List<ShiftUser>> getAll(){
        return ResponseEntity.ok(shiftUserService.getAllShifts());
    }

    @PostMapping("")
    public ResponseEntity<String> addShift(@RequestBody ShiftUser shift){
        shiftUserService.addShift(shift);
        return new ResponseEntity<>("Shift added successfully", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShiftUser(@PathVariable UUID id){
        return shiftUserService.deleteShiftUser(id);
    }
}
