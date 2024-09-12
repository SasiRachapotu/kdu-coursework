package org.example.beans;

import org.example.entity.Tyre;
import org.springframework.stereotype.Component;

@Component
public class TyreService {

    public Tyre getMRFTyre(){
        return new Tyre("MRF",10000);
    }

    public Tyre getBridgestoneTyre(){
        return new Tyre("Bridgestone",5000);
    }
}

