package com.example.springhandson3.service;


import com.example.springhandson3.entity.Speaker;
import org.springframework.stereotype.Service;

@Service
public class SpeakerService {

    public Speaker getSonySpeaker(){
        return new Speaker("Sony",10000);
    }

    public Speaker getBoseSpeaker(){
        return new Speaker("Bose",20000);
    }
}

