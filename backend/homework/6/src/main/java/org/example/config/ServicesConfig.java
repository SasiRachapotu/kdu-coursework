package org.example.config;

import org.example.beans.SpeakerService;
import org.example.beans.TyreService;
import org.example.beans.VehicleService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServicesConfig {

    @Bean
    public TyreService tyreService() {
        return new TyreService();
    }

    @Bean
    public SpeakerService speakerService() {
        return new SpeakerService();
    }

    @Bean
    public VehicleService vehicleService() {
        return new VehicleService();
    }
}
