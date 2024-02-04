package com.kdu.smarthome.config;

import com.kdu.smarthome.entity.Users;
import com.kdu.smarthome.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CustomUserDetails implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetails(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     *
     * @param username the username identifying the user whose data is required.
     * @return User object which contains user details
     * @throws UsernameNotFoundException is thrown whenever user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users userFromRepo = userRepository.findByUsername(username);
        Users userModel = null;
        if(userFromRepo!=null){
            userModel = userFromRepo;
        }
        String personUserName;
        String personPassword;
        List<GrantedAuthority> authorities;

        if (userModel == null) {
            throw new UsernameNotFoundException("User details not found !! please register!!");
        } else {
            personUserName = userModel.getUsername();
            personPassword = userModel.getPassword();
            authorities = new ArrayList<>();
        }
        return new User(personUserName, personPassword, authorities);
    }
}
