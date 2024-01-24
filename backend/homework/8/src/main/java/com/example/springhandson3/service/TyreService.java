package com.example.springhandson3.service;

import com.example.springhandson3.entity.Tyre;
import org.springframework.stereotype.Service;

@Service
public class TyreService {

    public Tyre getMRFTyre(){
        return new Tyre("MRF",10000);
    }

    public Tyre getBridgestoneTyre(){
        return new Tyre("Bridgestone",5000);
    }
}

