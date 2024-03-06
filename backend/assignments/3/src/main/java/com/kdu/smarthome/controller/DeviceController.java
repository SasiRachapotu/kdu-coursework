package com.kdu.smarthome.controller;

import com.kdu.smarthome.dto.request.AddDeviceRequestDto;
import com.kdu.smarthome.dto.request.DeviceRegisterRequestDto;
import com.kdu.smarthome.dto.response.AddDeviceResponseDto;
import com.kdu.smarthome.dto.response.DeviceRegisterResponseDto;
import com.kdu.smarthome.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/device")
public class DeviceController {

    DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService){
        this.deviceService=deviceService;
    }

    /**
     * This route registers the device from inventory for a user so that it can be added to room
     * @param deviceRegisterRequestDto takes device details like kickstonId, deviceUsername, password
     * @return deviceRegisterResponseDto which contains message, device details and http status code
     */
    @PostMapping("/register")
    public ResponseEntity<DeviceRegisterResponseDto> registerDevice(@RequestBody DeviceRegisterRequestDto deviceRegisterRequestDto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(deviceService.registerDevice(deviceRegisterRequestDto,username));
    }

    /**
     * This route is for adding a device to room of house
     * @param addDeviceRequestDto takes roomId, kickstonId, houseId for adding a device to a house
     * @return addDeviceResponseDto which contains message, house details and http status
     */

    @PostMapping("/add")
    public ResponseEntity<AddDeviceResponseDto> addDevice(@RequestBody AddDeviceRequestDto addDeviceRequestDto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(deviceService.addDevice(addDeviceRequestDto,username));
    }

}
