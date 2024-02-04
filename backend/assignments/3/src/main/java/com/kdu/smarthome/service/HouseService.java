package com.kdu.smarthome.service;

import com.kdu.smarthome.dto.request.AddHouseRequestDto;
import com.kdu.smarthome.dto.request.EditAddressRequestDto;
import com.kdu.smarthome.dto.response.*;
import com.kdu.smarthome.entity.House;
import com.kdu.smarthome.entity.Users;
import com.kdu.smarthome.exception.custom.house.UnauthorizedUserException;
import com.kdu.smarthome.exception.custom.house.UserNotFoundException;
import com.kdu.smarthome.repository.HouseRepository;
import com.kdu.smarthome.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HouseService {

    HouseRepository houseRepository;
    UserRepository userRepository;

    @Autowired
    public HouseService(HouseRepository houseRepository, UserRepository userRepository){
        this.houseRepository=houseRepository;
        this.userRepository=userRepository;
    }

    // Adding house to database
    public AddHouseResponseDto addHouse(AddHouseRequestDto addHouseRequestDto,String username){
        Users user = userRepository.findByUsername(username);

        // check if user is valid
        if(user == null){
            throw new UserNotFoundException();
        }

        // if user is valid create the house
        House house = new House();
        house.setHouseName(addHouseRequestDto.getHomeName());
        house.setAddress(addHouseRequestDto.getAddress());
        house.setAdmin(user);
        List<House> houses = user.getCreatedHouses();
        houses.add(house);
        house.setAdmin(user);

        // save the house and user
        houseRepository.save(house);
        userRepository.save(user);
        return new AddHouseResponseDto("House added successfully",house, HttpStatus.OK);
    }

    // adding user to house
    public AddUserToHouseResponseDto addUserToHouse(Long houseId, String username,String adminUser){
        Users admin = userRepository.findByUsername(adminUser);
        // check if admin is valid
        if(admin==null){
            throw new UserNotFoundException();
        }
        // check if the user is the admin of the house
        if(admin.getCreatedHouses().stream().filter(house1->house1.getId().equals(houseId)).findFirst().orElse(null)==null){
            throw new UnauthorizedUserException();
        }
        // saving the house and user
        House house = houseRepository.getReferenceById(houseId);
        Users user = userRepository.findByUsername(username);

        // check if user not found (user that is to be added to house)
        if(user==null){
            throw new UserNotFoundException();
        }

        // add user and save in database
        house.getHouseMembers().add(user);
        houseRepository.save(house);
        return new AddUserToHouseResponseDto("User added to the house",user,HttpStatus.OK);
    }

    // Get all houses
    public AllHousesResponseDto getAllHouses(String username){
        // check if user is registered
        if(userRepository.findByUsername(username)==null){
            throw new UnauthorizedUserException();
        }
        // returns list of all the house
        List<House> ans =houseRepository.findAll();

        return new AllHousesResponseDto("Retrieved all the houses successfully!!",ans.toString(),HttpStatus.OK);
    }

    // edit address
    public EditAddressResponseDto editAddress(Long id, String username, EditAddressRequestDto editAddressRequestDto){
        Users user = userRepository.findByUsername(username);
        // check if user is valid
        if(user==null){
            throw new UserNotFoundException();
        }
        // check id user is admin or member of the house
        if(user.getCreatedHouses().stream().filter(house1->house1.getId().equals(id)).findFirst().orElse(null)==null && houseRepository.getReferenceById(id).getHouseMembers().stream().filter(u->u.getUsername().equals(username)).findFirst().orElse(null)==null){
            throw new UnauthorizedUserException();
        }

        // save the address of the house
        House house = houseRepository.getReferenceById(id);
        house.setAddress(editAddressRequestDto.getAddress());
        houseRepository.save(house);

        return new EditAddressResponseDto("address modified successfully",house,HttpStatus.OK);
    }

    // get house by id
    public HouseByIdResponseDto getHouseById(Long houseId,String username){
        Users user = userRepository.findByUsername(username);
        // check if user is valid or registered
        if(user==null){
            throw new UserNotFoundException();
        }
        // get details of the house
        House house = houseRepository.getReferenceById(houseId);

        return new HouseByIdResponseDto("House details retrieved",house.toString(),HttpStatus.OK);
    }
}
