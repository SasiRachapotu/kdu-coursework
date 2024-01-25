package com.example.springhandson3.service;

import com.example.springhandson3.entity.Location;
import org.springframework.stereotype.Service;

import static com.example.springhandson3.util.Constants.*;

@Service
public class LocationService implements LocationServiceSchema{

    public Location getLocationBengaluru(){
        return new Location(BENGALURU,TRANSPORTPERCENTAGEBENGALURU);
    }

    public Location getLocationMumbai(){
        return new Location(MUMBAI,TRANSPORTPERCENTAGEMUMBAI);
    }
}
