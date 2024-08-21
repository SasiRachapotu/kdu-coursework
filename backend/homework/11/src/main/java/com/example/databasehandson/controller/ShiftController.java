package com.example.databasehandson.controller;

import com.example.databasehandson.dto.request.ShiftsDto;
import com.example.databasehandson.entity.Shift;
import com.example.databasehandson.service.ShiftsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ShiftController {

    ShiftsService shiftsService;

    @Autowired
    public ShiftController(ShiftsService shiftsService){
        this.shiftsService=shiftsService;
    }

    @PostMapping("/shift")
    public ResponseEntity<String> addShift(@RequestBody ShiftsDto shiftsDto){
        shiftsService.addShift(shiftsDto);
        return ResponseEntity.ok("Shift added successfully!!");
    }

    @GetMapping("/getShift/{name}")
    public ResponseEntity<Shift> getShift(@PathVariable String name){
        return ResponseEntity.ok(shiftsService.getShiftByName(name));
    }
}
