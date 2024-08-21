package com.example.springhandson3.service;


import com.example.springhandson3.entity.Speaker;
import org.springframework.stereotype.Service;

import static com.example.springhandson3.util.Constants.*;

@Service
public class SpeakerService implements SpeakerServiceSchema{

    public Speaker getSonySpeaker(){
        return new Speaker(SONY,SONYCOST);
    }

    public Speaker getBoseSpeaker(){
        return new Speaker(BOSE,BOSECOST);
    }
}

