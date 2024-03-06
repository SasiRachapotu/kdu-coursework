package com.kdu.smarthome.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class TokenValidatorFilter extends OncePerRequestFilter {
    // Jwt header and key used to generate token and send
    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_KEY = "jxgEQeXHuPq8VdbyYFNkANdudQ53YUn4";


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Get the request uri
        String path = request.getRequestURI();

        // if path equals register then proceed without any further processing
        // don't validate this route as this for registration
        if(path.equals("/api/v1/auth/register")){
            filterChain.doFilter(request, response);
            return;
        }

        // Get the bearer token set in header
        String jwtWithBearer = request.getHeader(JWT_HEADER);
        if (jwtWithBearer != null) {
            try {
                String jwt = jwtWithBearer.substring(7);
                SecretKey key = Keys.hmacShaKeyFor(JWT_KEY.getBytes(StandardCharsets.UTF_8));

                // receive claims set in token
                Claims claims = Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(jwt)
                        .getPayload();

                // username from claims
                String username = String.valueOf(claims.get("username"));
                // roles if any from claims
                String authorities = (String) claims.get("roles");

                // Setting authentication which is used in later routes to directly get the authentication and the username from the authentication.
                Authentication auth = new UsernamePasswordAuthenticationToken(username, null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));

                // Setting context
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                throw new BadCredentialsException("Invalid Token received!");
            }
        }
        else{
            // If token is empty or invalid throw unauthorized exception
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token!!");
            return;
        }

        filterChain.doFilter(request, response);
    }


    // should not filter the route /api/v1/auth/register and also taken care above also so that this route don't get validated
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().equals("/api/v1/auth/register");
    }
}
