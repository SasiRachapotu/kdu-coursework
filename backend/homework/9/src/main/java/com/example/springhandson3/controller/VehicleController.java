package com.example.springhandson3.controller;

import com.example.springhandson3.dto.request.VehicleRequestDto;
import com.example.springhandson3.dto.response.VehicleResponseDto;
import com.example.springhandson3.service.VehicleService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;


    @Autowired
    VehicleController(VehicleService vehicleService){
        this.vehicleService=vehicleService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addVehicle(@Valid @RequestBody VehicleRequestDto vehicleRequestDto){
        VehicleResponseDto response =vehicleService.addVehicle(vehicleRequestDto);
        log.info("Post Request Successful");
        return response!=null?ResponseEntity.ok("Vehicle added"):ResponseEntity.ok("No vehicle added check all fields");
    }

    @GetMapping("/{id}")
    public VehicleResponseDto getVehicle(@PathVariable int id){
        log.info("Get Request Successful");
        return vehicleService.getVehicle(id);
    }

    @PutMapping("/{id}")
    public VehicleResponseDto updateVehicle(@PathVariable int id, @RequestBody VehicleRequestDto vehicleRequestDto){
        log.info("PUT request successful");
        return vehicleService.updateByIndex(id, vehicleRequestDto);
    }

    @DeleteMapping("/{id}")
    public  VehicleResponseDto deleteVehicle(@PathVariable int id){
        log.info("Delete request successful");
        return vehicleService.deleteVehicle(id);
    }

    @GetMapping("/search/vehicle")
    public VehicleResponseDto vehicleSearch(@RequestParam String expensive){
        log.info("Search request successful");
        return vehicleService.search(expensive);
    }

}
