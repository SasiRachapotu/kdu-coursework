package org.example.beans;

import jakarta.annotation.PostConstruct;
import org.example.entity.Speaker;
import org.example.entity.Tyre;
import org.example.entity.Vehicle;
import org.example.logging.Logging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
public class VehicleService {

    @Autowired
    private TyreService tyreService;

    @Autowired
    private SpeakerService speakerService;

    private List<Vehicle> vehicles;

    Logging logging = new Logging();

    @PostConstruct
    public void init() {
        vehicles = generateVehicleList(10);
        logging.logString("Post construct executed initialized with 10 vehicles");
    }

    public List<Vehicle> generateVehicleList(int numberOfVehicles) {
        List<Vehicle> vehicleList = new ArrayList<>();
        for (int i = 0; i < numberOfVehicles; i++) {
            Tyre tyre;
            Speaker speaker;
            if(i%4==0){
                speaker=speakerService.getSonySpeaker();
                tyre=tyreService.getBridgestoneTyre();
            }
            else if(i%4==1){
                speaker=speakerService.getSonySpeaker();
                tyre=tyreService.getMRFTyre();
            }
            else if(i%4==2){
                speaker=speakerService.getBoseSpeaker();
                tyre=tyreService.getBridgestoneTyre();
            }
            else{
                speaker=speakerService.getBoseSpeaker();
                tyre=tyreService.getMRFTyre();
            }

            double vehiclePrice = tyre.getPrice() + speaker.getPrice() + Math.random() * 1000;
            Vehicle vehicle = new Vehicle(tyre, speaker, vehiclePrice);
            vehicleList.add(vehicle);
        }
        return vehicleList;
    }

    public Vehicle mostExpensiveVehicle() {
        return vehicles.stream()
                .max(Comparator.comparingDouble(Vehicle::getPrice))
                .orElse(null);
    }

    public List<Vehicle> getVehicles() {
        return vehicles;
    }
}

