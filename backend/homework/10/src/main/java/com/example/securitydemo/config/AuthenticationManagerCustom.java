package com.example.securitydemo.config;

import com.example.securitydemo.entity.Person;
import com.example.securitydemo.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

//@Component
public class AuthenticationManagerCustom implements AuthenticationProvider {

    AuthenticationService authenticationService;
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManagerCustom(AuthenticationService authenticationService,PasswordEncoder passwordEncoder){
        this.authenticationService=authenticationService;
        this.passwordEncoder=passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username =authentication.getName();
        String password = authentication.getCredentials().toString();
        Person person = authenticationService.getByName(username);

        if(person == null){
            throw new BadCredentialsException("No user registered with the given details!!");
        }
        else{
            if(passwordEncoder.matches(password, person.getPassword())){
                return new UsernamePasswordAuthenticationToken(username,password,getGrantedAuthorities(person.getRole()));
            }
            else{
                throw new BadCredentialsException("Invalid Password");
            }
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

    private List<GrantedAuthority> getGrantedAuthorities(String role) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        grantedAuthorities.add(new SimpleGrantedAuthority(role));

        return grantedAuthorities;
    }
}
