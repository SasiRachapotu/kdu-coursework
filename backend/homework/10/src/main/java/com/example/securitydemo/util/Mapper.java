package com.example.securitydemo.util;

import com.example.securitydemo.dto.auth.LoginResponseDto;
import com.example.securitydemo.dto.request.UserRequestDto;
import com.example.securitydemo.dto.response.UserResponseDto;
import com.example.securitydemo.entity.Person;
import com.example.securitydemo.entity.User;

public class Mapper {

    private Mapper(){

    }

    public static User requestToUser(UserRequestDto requestDto){
        return new User(requestDto.getUserName(), requestDto.getPassword(), requestDto.getEmail());
    }

    public static  UserResponseDto userToResponse(User user){
        return new UserResponseDto(user.getUserName(), user.getEmail());
    }

    public static LoginResponseDto personToResponse(Person person){
        return new LoginResponseDto(person.getName(), person.getRole());
    }


}
