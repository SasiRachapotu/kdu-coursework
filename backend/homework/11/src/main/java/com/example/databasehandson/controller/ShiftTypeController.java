package com.example.databasehandson.controller;

import com.example.databasehandson.dto.request.ShiftTypeRequestDto;
import com.example.databasehandson.entity.ShiftType;
import com.example.databasehandson.service.ShiftTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ShiftTypeController {

    ShiftTypeService shiftTypeService;
    @Autowired
    public ShiftTypeController(ShiftTypeService shiftTypeService){
        this.shiftTypeService=shiftTypeService;
    }
    @PostMapping("/type")
    public ResponseEntity<String> addShiftType(@RequestBody ShiftTypeRequestDto shiftTypeRequestDto){
        shiftTypeService.addShiftTypeService(shiftTypeRequestDto);
        return ResponseEntity.ok("Shift Type added successfully");
    }

    @GetMapping("/shifttype/{name}")
    public  ResponseEntity<ShiftType> getShiftType(@PathVariable String name){
       return ResponseEntity.ok(shiftTypeService.getShiftByName(name));
    }
}
