package com.example.springhandson3.service;

import com.example.springhandson3.entity.Location;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    public Location getLocationBengaluru(){
        return new Location("Bengaluru",5.5);
    }

    public Location getLocationMumbai(){
        return new Location("Mumbai",10.2);
    }
}
