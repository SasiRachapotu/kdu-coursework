package com.example.assesment2.config;

import com.example.assesment2.filter.TokenGenrationFilter;
import com.example.assesment2.filter.TokenValidationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

public class CustomSecurityConfig {

        @Bean
        SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
            http
                    .addFilterAfter(new TokenGenrationFilter(), BasicAuthenticationFilter.class)
                    .addFilterBefore(new TokenValidationFilter(), BasicAuthenticationFilter.class)
                    .authorizeHttpRequests(requests -> requests
                            .requestMatchers("/signup").permitAll()
                            .requestMatchers("/login").permitAll()
                            .requestMatchers("/users/create").hasRole("ADMIN")
                            .anyRequest().permitAll())
                    .csrf().disable();
        http.formLogin(withDefaults());
            http.httpBasic(withDefaults());
            http.csrf().disable();
            return http.build();
        }

        @Bean
        PasswordEncoder passwordEncoder(){
            return new BCryptPasswordEncoder();
        }
}
