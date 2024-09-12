package org.example.beans;

import org.example.entity.Speaker;
import org.springframework.stereotype.Component;

@Component
public class SpeakerService {

    public Speaker getSonySpeaker(){
        return new Speaker("Sony",10000);
    }

    public Speaker getBoseSpeaker(){
        return new Speaker("Bose",20000);
    }
}

