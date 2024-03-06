package com.kdu.smarthome.service;

import com.kdu.smarthome.dto.request.RegisterRequestDto;
import com.kdu.smarthome.dto.response.RegisterResponseDto;
import com.kdu.smarthome.entity.Users;
import com.kdu.smarthome.exception.custom.auth.EmptyFieldException;
import com.kdu.smarthome.repository.UserRepository;
import com.kdu.smarthome.util.JwtGeneratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    UserRepository userRepository;

    PasswordEncoder passwordEncoder;
    JwtGeneratorUtil jwtGeneratorUtil;
    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtGeneratorUtil jwtGeneratorUtil){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtGeneratorUtil = jwtGeneratorUtil;
    }

    public RegisterResponseDto registerUser(RegisterRequestDto registerRequestDto){

        // Empty field checked here again
        if(registerRequestDto.getName()==null || registerRequestDto.getEmailId()==null ||registerRequestDto.getFirstName()==null || registerRequestDto.getLastName()==null || registerRequestDto.getPassword()==null || registerRequestDto.getUsername()==null){
            throw new EmptyFieldException();
        }
        // new user
        Users user = new Users();
        user.setName(registerRequestDto.getName());
        user.setEmailId(registerRequestDto.getEmailId());
        user.setFirstName(registerRequestDto.getFirstName());
        user.setLastName(registerRequestDto.getLastName());

        // password encoding
        user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
        user.setUsername(registerRequestDto.getUsername());

        // saving user in database
        userRepository.save(user);

        // generate token for new user
        String token = jwtGeneratorUtil.getTokenNew(registerRequestDto);
        return new RegisterResponseDto("Successful registration",token);
    }
}
