package org.example.beans;

import jakarta.annotation.PostConstruct;
import org.example.entity.Location;
import org.example.entity.Speaker;
import org.example.entity.Tyre;
import org.example.entity.Vehicle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Component
@Scope("prototype")
public class VehicleService {

    private TyreService tyreService;

    @Autowired
    public void setTyreService(TyreService tyreService) {
        this.tyreService = tyreService;
    }

    @Autowired
    private SpeakerService speakerService;

    private final Inventory inventory;

    private Location location;

    private static final Logger logger = LoggerFactory.getLogger(VehicleService.class);


    @Autowired
    public VehicleService( Inventory inventory,@Qualifier("bengaluru") Location location){
        this.inventory=inventory;
        this.location=location;
    }

    private List<Vehicle> vehicles;

    @PostConstruct
    public void init() {
        vehicles = generateVehicleList(10);
        logger.info("Post construct executed initialized with 10 vehicles");
    }

    public List<Vehicle> generateVehicleList(int numberOfVehicles) {
        if ( logger.isInfoEnabled()) {
            logger.info(String.format("Location: %s and percentage: %s",location.getPlace(),location.getTransportPercentage()));
        }
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
            double vehiclePrice = (tyre.getPrice() + speaker.getPrice() + Math.random() * 1000)*(1+(location.getTransportPercentage()/100));
            Vehicle vehicle = new Vehicle(tyre, speaker, vehiclePrice);
            vehicleList.add(vehicle);
            inventory.addVehicle(vehicle);
        }
        vehicles=vehicleList;
        return vehicleList;
    }

    public Vehicle mostExpensiveVehicle() {
        return vehicles.stream()
                .max(Comparator.comparingDouble(Vehicle::getPrice))
                .orElse(null);
    }

    public Vehicle mostCheapVehicle(){
        return vehicles.stream().min(Comparator.comparingDouble(Vehicle::getPrice)).orElse(null);
    }

    public List<Vehicle> getVehicles() {
        return vehicles;
    }

    public List<Vehicle> getInventory(){
        return inventory.getVehicles();
    }

    public Location getLocation(){
        return location;
    }
}

