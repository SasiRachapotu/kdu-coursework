package com.kdu.smarthome.service;

import com.kdu.smarthome.dto.request.AddToInventoryRequestDto;
import com.kdu.smarthome.dto.response.AddToInventoryResponseDto;
import com.kdu.smarthome.dto.response.GetInventoryResponseDto;
import com.kdu.smarthome.entity.Inventory;
import com.kdu.smarthome.entity.Users;
import com.kdu.smarthome.exception.custom.house.UserNotFoundException;
import com.kdu.smarthome.repository.InventoryRepository;
import com.kdu.smarthome.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {
    InventoryRepository inventoryRepository;
    UserRepository userRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository, UserRepository userRepository){
        this.inventoryRepository=inventoryRepository;
        this.userRepository=userRepository;
    }

    // Get all the items of inventory
    public GetInventoryResponseDto getAllInventory(String username){
        Users user = userRepository.findByUsername(username);

        // check if user is valid
        if(user==null){
            throw new UserNotFoundException();
        }

        return new GetInventoryResponseDto(inventoryRepository.findAll().toString(), HttpStatus.OK);
    }

    // add item to inventory
    public AddToInventoryResponseDto addToInventory(AddToInventoryRequestDto addToInventoryRequestDto,String username){

        // check if user is valid
        if(userRepository.findByUsername(username)==null){
            throw new UserNotFoundException();
        }
        Inventory inventory = new Inventory();
        inventory.setKickstonId(addToInventoryRequestDto.getKickstonId());
        inventory.setDeviceUsername(addToInventoryRequestDto.getDeviceUsername());
        inventory.setDevicePassword(addToInventoryRequestDto.getDevicePassword());
        inventory.setManufactureDateTime(addToInventoryRequestDto.getManufactureDateTime());
        inventory.setManufactureFactoryPlace(addToInventoryRequestDto.getManufactureFactoryPlace());

        // save item in database
        inventoryRepository.save(inventory);
        return new AddToInventoryResponseDto("Item added to inventory",inventory,HttpStatus.OK);
    }
}
