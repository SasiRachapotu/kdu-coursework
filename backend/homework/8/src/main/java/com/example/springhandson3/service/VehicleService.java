package com.example.springhandson3.service;

import com.example.springhandson3.dto.VehicleRequestDto;
import com.example.springhandson3.dto.VehicleResponseDto;
import com.example.springhandson3.entity.Location;
import com.example.springhandson3.entity.Speaker;
import com.example.springhandson3.entity.Tyre;
import com.example.springhandson3.entity.Vehicle;
import com.example.springhandson3.repository.Inventory;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class VehicleService {

    private final TyreService tyreService;
    private final SpeakerService speakerService;

    private final Inventory inventory;

    private final LocationService locationService;


    private static final Logger logger = LoggerFactory.getLogger(VehicleService.class);


    @Autowired
    public VehicleService(Inventory inventory, SpeakerService speakerService,TyreService tyreService,LocationService locationService){
        this.inventory=inventory;
        this.locationService=locationService;
        this.speakerService=speakerService;
        this.tyreService=tyreService;
    }


    @PostConstruct
    public void init() {
        logger.info("=================================== Initialized a Vehicle Service ================================");
    }

    public Vehicle mapDtoToVehicle(VehicleRequestDto vehicleRequestDto){
        Location location;
        Tyre tyre;
        Speaker speaker;
        if(vehicleRequestDto.getLocation().equals("Bengaluru")){
            location=locationService.getLocationBengaluru();
        }
        else if(vehicleRequestDto.getLocation().equals("Mumbai")){
            location=locationService.getLocationMumbai();
        }
        else{
            location = null;
        }

        if(vehicleRequestDto.getTyre().equals("MRF")){
            tyre = tyreService.getMRFTyre();
        }
        else if(vehicleRequestDto.getTyre().equals("Bridgestone")){
            tyre = tyreService.getBridgestoneTyre();
        }else{
            tyre =null;
        }

        if(vehicleRequestDto.getSpeaker().equals("Sony")){
            speaker = speakerService.getSonySpeaker();
        }
        else if(vehicleRequestDto.getSpeaker().equals("Bose")){
            speaker = speakerService.getBoseSpeaker();
        }
        else{
            speaker =null;
        }

        if(location ==null || speaker==null || tyre==null){
            return null;
        }

        double vehiclePrice = (tyre.getPrice() + speaker.getPrice() + Math.random() * 1000)*(1+(location.getTransportPercentage()/100));


        return new Vehicle(tyre,speaker,vehiclePrice);
    }

    public VehicleResponseDto mapVehicleToVehicleResponseDto(Vehicle vehicle){
        if(vehicle==null){
            return null;
        }
        return new VehicleResponseDto(vehicle.getTyre().getBrand(),vehicle.getSpeaker().getBrand(),vehicle.getPrice());
    }

    public VehicleResponseDto addVehicle(VehicleRequestDto vehicleRequestDto){
        Vehicle vehicle = mapDtoToVehicle(vehicleRequestDto);
        if(vehicle!=null){
            inventory.addVehicle(vehicle);
        }
        return mapVehicleToVehicleResponseDto(vehicle);
    }

    public VehicleResponseDto getVehicle(int index){
        return mapVehicleToVehicleResponseDto(inventory.getVehicleByIndex(index));
    }

    public VehicleResponseDto updateByIndex(int index, VehicleRequestDto vehicleRequestDto){
        Vehicle vehicle = mapDtoToVehicle(vehicleRequestDto);
        if(vehicle!=null){
            inventory.updateByIndex(index,vehicle);
        }
        return mapVehicleToVehicleResponseDto(vehicle);
    }

    public VehicleResponseDto deleteVehicle(int index){
        return mapVehicleToVehicleResponseDto(inventory.removeByIndex(index));
    }


    public VehicleResponseDto search(String expense){
        if(expense.equals("most")){
            return mapVehicleToVehicleResponseDto(mostExpensiveVehicle());
        }
        else if(expense.equals("least")){
            return mapVehicleToVehicleResponseDto(mostCheapVehicle());
        }

        return null;
    }

    public Vehicle mostExpensiveVehicle() {
        return inventory.getVehicles().stream()
                .max(Comparator.comparingDouble(Vehicle::getPrice))
                .orElse(null);
    }

    public Vehicle mostCheapVehicle(){
        return inventory.getVehicles().stream().min(Comparator.comparingDouble(Vehicle::getPrice)).orElse(null);
    }


    public List<Vehicle> getInventory(){
        return inventory.getVehicles();
    }
}

