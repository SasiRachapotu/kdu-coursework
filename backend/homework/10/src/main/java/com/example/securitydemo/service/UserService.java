package com.example.securitydemo.service;


import com.example.securitydemo.dto.request.UserRequestDto;
import com.example.securitydemo.dto.response.UserResponseDto;

import java.util.List;

public interface UserService {

    public List<UserResponseDto> getAllUsers();
    public void addUser(UserRequestDto userRequestDto);
    public UserResponseDto getByName(String name);

}
