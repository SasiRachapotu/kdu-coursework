package com.example.securitydemo.config;

import com.example.securitydemo.entity.Person;
import com.example.securitydemo.service.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PersonUserDetailService implements UserDetailsService {

    AuthenticationService authenticationService;

    @Autowired
    public PersonUserDetailService(AuthenticationService authenticationService){
        this.authenticationService=authenticationService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = authenticationService.getByName(username);
        String personName = null;
        String password = null;
        List<GrantedAuthority> authorityList = null;

        if(person ==null){
            throw new UsernameNotFoundException("User not found with username: "+username);
        }
        else {
            personName = person.getName();
            password = person.getPassword();
            authorityList = new ArrayList<>();
            authorityList.add(new SimpleGrantedAuthority(person.getRole()));
        }

        return new User(personName,password,authorityList);
    }
}
