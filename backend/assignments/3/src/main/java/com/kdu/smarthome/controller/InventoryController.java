package com.kdu.smarthome.controller;

import com.kdu.smarthome.dto.request.AddToInventoryRequestDto;
import com.kdu.smarthome.dto.response.AddToInventoryResponseDto;
import com.kdu.smarthome.dto.response.GetInventoryResponseDto;
import com.kdu.smarthome.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {

    InventoryService inventoryService;
    @Autowired
    public InventoryController(InventoryService inventoryService){
        this.inventoryService=inventoryService;
    }

    /**
     * This is GET mapping for retrieving all the inventory items
     * @return List of inventory items
     */
    @GetMapping("")
    public ResponseEntity<GetInventoryResponseDto> getInventory(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(inventoryService.getAllInventory(username));
    }

    /**
     * This is POST mapping for adding a product to Inventory
     * @param addToInventoryRequestDto takes kickstonId, device_username, device_password, manufacture date time and manufacture factory place
     * @return The details of the item added to the inventory
     */
    @PostMapping("")
    public ResponseEntity<AddToInventoryResponseDto> addToInventory(@RequestBody AddToInventoryRequestDto addToInventoryRequestDto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(inventoryService.addToInventory(addToInventoryRequestDto,username));
    }
}
