package com.kdu.smarthome.config;

import com.kdu.smarthome.filter.TokenGeneratorFilter;
import com.kdu.smarthome.filter.TokenValidatorFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class CustomSecurityConfig  {

    // Custom Authentication manager that we have created added using constructor injection
    private final CustomAuthenticationManager authProvider;

    @Autowired
    public CustomSecurityConfig(CustomAuthenticationManager authProvider){
        this.authProvider = authProvider;
    }

    // Builds authentication manager with the custom authentication provider and returns Authentication manager
    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(authProvider);
        return authenticationManagerBuilder.build();
    }

    /**
     * Configures the security filters and rules for handling authentication and authorization in the application.
     *
     * This method sets up the routes with the 'auth' path prefix to permit all access, allowing anyone to register and login.
     * All other routes are configured to require authentication, ensuring that proper authentication and authorization checks
     * are applied to secure endpoints.
     *
     * Additionally, two custom filters, TokenGeneratorFilter and TokenValidatorFilter, are added to the security filter chain.
     * TokenGeneratorFilter is placed after BasicAuthenticationFilter, responsible for generating authentication tokens,
     * while TokenValidatorFilter is placed before BasicAuthenticationFilter, responsible for validating incoming tokens.
     *
     * @param http The HttpSecurity instance to configure security settings.
     * @return A SecurityFilterChain with the specified security configurations.
     * @throws Exception If an error occurs during security configuration.
     */
    @Bean
    public SecurityFilterChain customDefaultFilter(HttpSecurity http) throws Exception {
        http
                .addFilterAfter(new TokenGeneratorFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(new TokenValidatorFilter(), BasicAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .anyRequest().authenticated()).csrf(AbstractHttpConfigurer::disable);
        http.httpBasic(withDefaults());
        return http.build();
    }

}

