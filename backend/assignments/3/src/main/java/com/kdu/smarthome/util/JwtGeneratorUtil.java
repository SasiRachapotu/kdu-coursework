package com.kdu.smarthome.util;

import com.kdu.smarthome.config.CustomAuthenticationManager;
import com.kdu.smarthome.dto.request.RegisterRequestDto;
import com.kdu.smarthome.filter.TokenGeneratorFilter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
public class JwtGeneratorUtil {

    // custom authentication provider created
    private final CustomAuthenticationManager customAuthProvider;

    // token generation filter used to generate the token
    private final TokenGeneratorFilter tokenGeneratorFilter;

    @Autowired
    public JwtGeneratorUtil(CustomAuthenticationManager customAuthProvider, TokenGeneratorFilter tokenGeneratorFilter) {
        this.customAuthProvider = customAuthProvider;
        this.tokenGeneratorFilter = tokenGeneratorFilter;
    }

    // function used to generate the token when the user registers
    public String getTokenNew(RegisterRequestDto userRequestDTO){

        // used custom authenticator to authenticate the user
        Authentication authentication = customAuthProvider.authenticate(
                new UsernamePasswordAuthenticationToken(userRequestDTO.getUsername(), userRequestDTO.getPassword())
        );
        return tokenGeneratorFilter.generateJWT(authentication);
    }
}
