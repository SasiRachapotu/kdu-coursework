package org.example.config;


import org.example.entity.Location;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "org.example.beans")
public class ProjectConfig {

    @Bean("mumbai")
    public Location getLocation1(){
        return new Location("Mumbai",10.2);
    }

    @Bean("bengaluru")
    public Location getLocation2(){
        return new Location("Bengaluru",5.5);
    }
}
