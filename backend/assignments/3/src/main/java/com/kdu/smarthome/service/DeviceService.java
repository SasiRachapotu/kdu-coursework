package com.kdu.smarthome.service;

import com.kdu.smarthome.dto.request.AddDeviceRequestDto;
import com.kdu.smarthome.dto.request.DeviceRegisterRequestDto;
import com.kdu.smarthome.dto.response.AddDeviceResponseDto;
import com.kdu.smarthome.dto.response.DeviceRegisterResponseDto;
import com.kdu.smarthome.entity.*;
import com.kdu.smarthome.exception.custom.device.DeviceAlreadyRegisteredException;
import com.kdu.smarthome.exception.custom.device.UnavailableDeviceException;
import com.kdu.smarthome.exception.custom.house.HouseNotFoundException;
import com.kdu.smarthome.exception.custom.house.UnauthorizedUserException;
import com.kdu.smarthome.exception.custom.house.UserNotFoundException;
import com.kdu.smarthome.exception.custom.room.InvalidRoomException;
import com.kdu.smarthome.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {
    DeviceRepository deviceRepository;
    InventoryRepository inventoryRepository;
    UserRepository userRepository;
    HouseRepository houseRepository;
    RoomRepository roomRepository;

    // constructor injection
    @Autowired
    public DeviceService(DeviceRepository deviceRepository,InventoryRepository inventoryRepository,UserRepository userRepository,HouseRepository houseRepository,RoomRepository roomRepository){
        this.deviceRepository=deviceRepository;
        this.inventoryRepository=inventoryRepository;
        this.userRepository=userRepository;
        this.houseRepository=houseRepository;
        this.roomRepository=roomRepository;
    }

    public DeviceRegisterResponseDto registerDevice(DeviceRegisterRequestDto deviceRegisterRequestDto,String username){

        Inventory inventory = inventoryRepository.findByKickstonId(deviceRegisterRequestDto.getKickstonId());

        // checking if device is there in inventory
        if(inventory==null){
            throw new UnavailableDeviceException();
        }
        // checking if the name given and the name of device same in inventory
        if(!inventory.getDeviceUsername().equals(deviceRegisterRequestDto.getDeviceUserName())){
            throw new UnavailableDeviceException();
        }

        Users user = userRepository.findByUsername(username);

        // checking if user is authenticated
        if(user == null){
            throw new UserNotFoundException();
        }

        Device device = deviceRepository.findByKickstonId(deviceRegisterRequestDto.getKickstonId());

        // checking if device is already registered
        if(device!=null && device.getUser().getUsername()!=null){
            throw new DeviceAlreadyRegisteredException();
        }
        // checking if the user registering is admin or not
        if(user.getCreatedHouses().isEmpty()){
            throw new UnauthorizedUserException();
        }

        // checking if the password is correct for the device that is in inventory (authorization)
        if(inventory.getDevicePassword().equals(deviceRegisterRequestDto.getPassword())){
            Device device1 = new Device();
            device1.setDeviceUsername(deviceRegisterRequestDto.getDeviceUserName());
            device1.setDevicePassword(deviceRegisterRequestDto.getPassword());
            device1.setUser(user);
            device1.setKickstonId(deviceRegisterRequestDto.getKickstonId());
            deviceRepository.save(device1);
            return new DeviceRegisterResponseDto("Device Registered successfully!!",device1, HttpStatus.OK);
        }
        else{
            throw new UnauthorizedUserException();
        }
    }

    // Adding device
    public AddDeviceResponseDto addDevice(AddDeviceRequestDto addDeviceRequestDto,String username){
        Users user = userRepository.findByUsername(username);

        // Check if user is valid
        if(user==null){
            throw new UserNotFoundException();
        }
        House house = houseRepository.findById(Long.parseLong(addDeviceRequestDto.getHouseId())).orElse(null);

        // check if houseId is valid
        if(house==null){
            throw new HouseNotFoundException();
        }

        // check if user is admin
        if(user.getCreatedHouses().stream().filter(house1 -> house1.getId().equals(Long.parseLong(addDeviceRequestDto.getHouseId()))).findFirst().orElse(null)==null){
            throw new UnauthorizedUserException();
        }

        Room room = roomRepository.findById(Long.parseLong(addDeviceRequestDto.getRoomId())).orElse(null);
        // check if roomId is invalid
        if(room ==null){
            throw new InvalidRoomException();
        }
        Device device = deviceRepository.findByKickstonId(addDeviceRequestDto.getKickstonId());
        // check if device id is invalid
        if(device==null){
            throw new UnavailableDeviceException();
        }
        // check if device is registered by the user
        if(!device.getUser().getId().equals(user.getId())){
            throw new UnauthorizedUserException();
        }

        // adding the device in room
        room.getDevices().add(device);
        roomRepository.save(room);
        house.getDevices().add(device);
        houseRepository.save(house);
        return new AddDeviceResponseDto("Added device successfully",house,HttpStatus.OK);
    }
}
