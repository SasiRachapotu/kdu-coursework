package com.kdu.smarthome.controller;

import com.kdu.smarthome.dto.request.AddRoomRequestDto;
import com.kdu.smarthome.dto.response.AddRoomResponseDto;
import com.kdu.smarthome.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    RoomService roomService;
    @Autowired
    public RoomController(RoomService roomService){
        this.roomService=roomService;
    }

    /**
     * This is POST mapping for adding a room to a house by admin user
     * @param houseId is retrieved via params
     * @param addRoomRequestDto is retrieved via request body, contains all the details of room line room_name to be added
     * @return the success message, room details and http status code
     */
    @PostMapping("")
    public ResponseEntity<AddRoomResponseDto>addRoom(@RequestParam String houseId, @RequestBody AddRoomRequestDto addRoomRequestDto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(roomService.addRoomToHouse(Long.parseLong(houseId),username,addRoomRequestDto));
    }

}
