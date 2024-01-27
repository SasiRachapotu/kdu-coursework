package com.caching.controller;

import com.caching.service.LocationServiceImpl1;
import com.caching.dto.request.ForwardGeoRequestDto;
import com.caching.dto.request.ReverseGeoRequestDto;
import com.caching.dto.response.FinalResponseDto;
import com.caching.dto.response.ForwardGeoResponseDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {
    private final LocationServiceImpl1 locationServiceImpl1;
    @Autowired
    LocationController(LocationServiceImpl1 locationServiceImpl1){
        this.locationServiceImpl1 = locationServiceImpl1;
    }

    @GetMapping("/geocoding")
    public ResponseEntity<FinalResponseDto> forwardGeoCoding(@Valid @ModelAttribute ForwardGeoRequestDto forwardGeoRequestDto){
        ForwardGeoResponseDto response = locationServiceImpl1.getLocationByAddress(forwardGeoRequestDto);
        return ResponseEntity.ok(new FinalResponseDto(response.getLatitude(), response.getLongitude()));
    }

    @GetMapping("/reverse-geocoding")
    public ResponseEntity<String> reverseGeoCoding(@ModelAttribute ReverseGeoRequestDto reverseGeoRequestDto){
        return ResponseEntity.ok(locationServiceImpl1.getLocationByLatitudeAndLongitude(reverseGeoRequestDto).getAddress());
    }
}
