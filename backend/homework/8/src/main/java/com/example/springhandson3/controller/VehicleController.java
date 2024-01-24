package com.example.springhandson3.controller;

import com.example.springhandson3.dto.VehicleRequestDto;
import com.example.springhandson3.dto.VehicleResponseDto;
import com.example.springhandson3.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    @Autowired
    VehicleController(VehicleService vehicleService){
        this.vehicleService=vehicleService;
    }

    @PostMapping("/addVehicle")
    public ResponseEntity<String> addVehicle(@Valid @RequestBody VehicleRequestDto vehicleRequestDto){
        VehicleResponseDto response =vehicleService.addVehicle(vehicleRequestDto);
        return response!=null?ResponseEntity.ok("Vehicle added"):ResponseEntity.ok("No vehicle added check all fields");
    }

    @GetMapping("/getVehicle/{id}")
    public VehicleResponseDto getVehicle(@PathVariable int id){
        return vehicleService.getVehicle(id);
    }

    @PutMapping("/updateVehicle/{id}")
    public VehicleResponseDto updateVehicle(@PathVariable int id, @RequestBody VehicleRequestDto vehicleRequestDto){
        return vehicleService.updateByIndex(id, vehicleRequestDto);
    }

    @DeleteMapping("/deleteVehicle/{id}")
    public  VehicleResponseDto deleteVehicle(@PathVariable int id){
        return vehicleService.deleteVehicle(id);
    }

    @GetMapping("/search/vehicle")
    public VehicleResponseDto vehicleSearch(@RequestParam String expensive){
        return vehicleService.search(expensive);
    }

}
