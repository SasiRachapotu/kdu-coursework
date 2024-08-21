package com.example.springhandson3.service;

import com.example.springhandson3.entity.Tyre;
import org.springframework.stereotype.Service;

import static com.example.springhandson3.util.Constants.*;

@Service
public class TyreService implements TyreServiceSchema{


    public Tyre getMRFTyre(){
        return new Tyre(MRF,MRFCOST);
    }

    public Tyre getBridgestoneTyre(){
        return new Tyre(BRIDGESTONE,BRIDGESTONECOST);
    }
}

