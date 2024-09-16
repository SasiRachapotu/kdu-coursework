package com.example.securitydemo.service;

import com.example.securitydemo.dto.request.UserRequestDto;
import com.example.securitydemo.dto.response.UserResponseDto;
import com.example.securitydemo.entity.User;
import com.example.securitydemo.repository.UserRepository;
import com.example.securitydemo.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    @Autowired
    UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public List<UserResponseDto> getAllUsers(){
        ArrayList<UserResponseDto> arrayList = new ArrayList<>();
        userRepository.getAllUsers().forEach(user->arrayList.add(Mapper.userToResponse(user)));
        return arrayList;
    }

    public void addUser(UserRequestDto userRequestDto){
        userRepository.addUser(Mapper.requestToUser(userRequestDto));
    }

    public UserResponseDto getByName(String name){
        User user = userRepository.getByName(name);
        return Mapper.userToResponse(user);
    }
}
