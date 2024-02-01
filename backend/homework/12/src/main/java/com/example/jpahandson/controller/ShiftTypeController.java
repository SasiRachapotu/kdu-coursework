package com.example.jpahandson.controller;

import com.example.jpahandson.model.ShiftType;
import com.example.jpahandson.service.ShiftTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shifttype")
public class ShiftTypeController {
    ShiftTypeService shiftTypeService;

    @Autowired
    public ShiftTypeController(ShiftTypeService shiftTypeService){
        this.shiftTypeService=shiftTypeService;
    }
    @GetMapping("")
    public ResponseEntity<List<ShiftType>> getAll(){
        return ResponseEntity.ok(shiftTypeService.getAllShifts());
    }

    @PostMapping("")
    public ResponseEntity<String> addShift(@RequestBody ShiftType shift){
        shiftTypeService.addShift(shift);
        return new ResponseEntity<>("Shift type added successfully", HttpStatus.ACCEPTED);
    }

}
