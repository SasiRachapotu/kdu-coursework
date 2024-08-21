package com.example.jpahandson.controller;

import com.example.jpahandson.model.Shift;
import com.example.jpahandson.service.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shift")
public class ShiftController {

    ShiftService shiftService;

    @Autowired
    public ShiftController(ShiftService shiftService){
        this.shiftService=shiftService;
    }
    @GetMapping("")
    public ResponseEntity<List<Shift>> getAll(){
        return ResponseEntity.ok(shiftService.getAllShifts());
    }

    @PostMapping("")
    public ResponseEntity<String> addShift(@RequestBody Shift shift){
        shiftService.addShift(shift);
        return new ResponseEntity<>("Shift added successfully", HttpStatus.ACCEPTED);
    }

    @GetMapping("/top3")
    public ResponseEntity<List<Shift>> getTop3(){
        return new ResponseEntity<>(shiftService.getTop3(),HttpStatus.ACCEPTED);
    }
}
