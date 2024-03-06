package com.kdu.smarthome.controller;

import com.kdu.smarthome.dto.request.AddHouseRequestDto;
import com.kdu.smarthome.dto.request.AddUserToHouseRequestDto;
import com.kdu.smarthome.dto.request.EditAddressRequestDto;
import com.kdu.smarthome.dto.response.*;
import com.kdu.smarthome.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/house")
public class HouseController {
    HouseService houseService;
    @Autowired
    public HouseController(HouseService houseService){
        this.houseService=houseService;
    }

    /**
     * This route is for adding a house for a user, user becomes admin of that house
     * @param addHouseRequestDto takes address and house name to add a house for a user
     * @return addHouseResponseDto returns success message, house details and status code
     */
    @PostMapping("")
    public ResponseEntity<AddHouseResponseDto> addHouse(@RequestBody AddHouseRequestDto addHouseRequestDto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(houseService.addHouse(addHouseRequestDto,username));
    }

    /**
     * This route is for adding a user to a house, only admin can add a user to the house
     * @param houseId is taken via path variable
     * @param user is AddUserToHouseRequestDto object which is taken from params which contains username, which is to be added to house
     * @return AddUserToHouseResponseDto which contain success message, user details and http status code
     */

    @PostMapping("/{houseId}/add-user")
    public ResponseEntity<AddUserToHouseResponseDto> addUserToHouse(@PathVariable String houseId, @RequestBody AddUserToHouseRequestDto user){
        String adminUser = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(houseService.addUserToHouse(Long.parseLong(houseId),user.getUsername(),adminUser));
    }

    /**
     * This route is a get request for retrieving all the houses
     * @return List of all the houses with all details of the house like the details of admin, rooms,devices.
     */

    @GetMapping("")
    public ResponseEntity<AllHousesResponseDto> getAllHouses(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(houseService.getAllHouses(username));
    }

    /**
     * This is a PUT request for modifying the address
     * @param houseId is taken via params
     * @param editAddressRequestDto takes the address
     * @return the house details with the modified address, success message and a status code
     */

    @PutMapping("")
    public ResponseEntity<EditAddressResponseDto> editAddress(@RequestParam String houseId, @RequestBody EditAddressRequestDto editAddressRequestDto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(houseService.editAddress(Long.parseLong(houseId),username,editAddressRequestDto));
    }

    /**
     * This is Get mapping for retrieving the house details via houseId
     * @param houseId is taken via path variable
     * @return The success message, House details including the devices and the rooms inside the house
     */


    @GetMapping("/{houseId}")
    public ResponseEntity<HouseByIdResponseDto> getHouseById(@PathVariable String houseId){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(houseService.getHouseById(Long.parseLong(houseId),username));
    }

}
