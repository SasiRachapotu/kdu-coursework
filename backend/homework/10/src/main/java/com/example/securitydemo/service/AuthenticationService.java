package com.example.securitydemo.service;

import com.example.securitydemo.dao.AuthenticationDao;
import com.example.securitydemo.dto.auth.LoginDto;
import com.example.securitydemo.dto.auth.LoginResponseDto;
import com.example.securitydemo.entity.Person;
import com.example.securitydemo.util.Mapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class AuthenticationService {
    AuthenticationDao authenticationDao;

    PasswordEncoder passwordEncoder;
    @Autowired
    public AuthenticationService(AuthenticationDao authenticationDao, PasswordEncoder passwordEncoder){
        this.authenticationDao = authenticationDao;
        this.passwordEncoder=passwordEncoder;
    }

    public void signUp(LoginDto loginDto){
        log.info("Signup initiated");
        authenticationDao.addPeople(new Person(loginDto.getName(), passwordEncoder.encode(loginDto.getPassword()), "ROLE_"+loginDto.getRole()));
    }

    public List<LoginResponseDto> getAllPersons(){
        ArrayList<LoginResponseDto> arrayList = new ArrayList<>();
        authenticationDao.getAll().forEach(person -> arrayList.add(Mapper.personToResponse(person)));
        return arrayList;
    }

    public Person getByName(String name){
        for(Person p : authenticationDao.getAll()){
            if(p.getName().equals(name)){
                return p;
            }
        }

        return null;
    }
}
