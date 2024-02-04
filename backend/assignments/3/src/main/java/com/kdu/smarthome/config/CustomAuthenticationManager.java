package com.kdu.smarthome.config;

import com.kdu.smarthome.entity.Users;
import com.kdu.smarthome.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * Defining custom authentication manager for doing authentication in custom way
 * Here authentication is done by verifying user from db and verifying password
 * Further modification can be done according to future use cases
 */

@Component
public class CustomAuthenticationManager implements AuthenticationProvider {
    private final UserRepository userRepository;

    @Autowired
    public CustomAuthenticationManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        //Get username and password from the authentication which has been set in the filters
        String username = authentication.getName();
        String pwd = authentication.getCredentials().toString();

        //Get username from user table in database
        Users usernameFromRepo = userRepository.findByUsername(username);

        // validating if user is not present in database and if present check for password and return Username password authentication
        if (usernameFromRepo == null) {
            throw new BadCredentialsException("No such user present!! please register first!!");
        } else {
            if (passwordEncoder().matches(pwd, usernameFromRepo.getPassword())) {
                return new UsernamePasswordAuthenticationToken(username, pwd, new ArrayList<>());
            } else {
                throw new BadCredentialsException("Invalid password!");
            }
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }


    // BCryptPasswordEncoder used for encoding and decoding password
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
