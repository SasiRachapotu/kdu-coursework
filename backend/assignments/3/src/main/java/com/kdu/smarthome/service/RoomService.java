package com.kdu.smarthome.service;

import com.kdu.smarthome.dto.request.AddRoomRequestDto;
import com.kdu.smarthome.dto.response.AddRoomResponseDto;
import com.kdu.smarthome.entity.House;
import com.kdu.smarthome.entity.Room;
import com.kdu.smarthome.entity.Users;
import com.kdu.smarthome.exception.custom.house.HouseNotFoundException;
import com.kdu.smarthome.exception.custom.house.UnauthorizedUserException;
import com.kdu.smarthome.exception.custom.house.UserNotFoundException;
import com.kdu.smarthome.repository.HouseRepository;
import com.kdu.smarthome.repository.RoomRepository;
import com.kdu.smarthome.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    RoomRepository roomRepository;
    HouseRepository houseRepository;
    UserRepository userRepository;
    @Autowired
    public RoomService(RoomRepository roomRepository, HouseRepository houseRepository, UserRepository userRepository){
        this.roomRepository=roomRepository;
        this.houseRepository=houseRepository;
        this.userRepository=userRepository;
    }

    // Add room to house
    public AddRoomResponseDto addRoomToHouse(Long houseId, String username, AddRoomRequestDto addRoomRequestDto){
        Users user = userRepository.findByUsername(username);

        // check if user is valid
        if(user==null){
            throw new UserNotFoundException();
        }
        House house = houseRepository.findById(houseId).orElse(null);
        // check if house is valid
        if(house==null){
            throw new HouseNotFoundException();
        }
        //check if user is admin of the house or not
        if(user.getCreatedHouses().stream().filter(house1 -> house1.getId().equals(houseId)).findFirst().orElse(null)==null){
            throw new UnauthorizedUserException();
        }
        // create room and save it in database
        Room room = new Room();
        room.setRoomName(addRoomRequestDto.getRoomName());
        roomRepository.save(room);
        house.getRooms().add(room);
        houseRepository.save(house);
        return new AddRoomResponseDto("Room added successful",room, HttpStatus.OK);
    }

}
