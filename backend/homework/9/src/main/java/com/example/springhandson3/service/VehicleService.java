package com.example.springhandson3.service;

import com.example.springhandson3.dto.request.VehicleRequestDto;
import com.example.springhandson3.dto.response.VehicleResponseDto;
import com.example.springhandson3.entity.Location;
import com.example.springhandson3.entity.Speaker;
import com.example.springhandson3.entity.Tyre;
import com.example.springhandson3.entity.Vehicle;
import com.example.springhandson3.exception.InvalidVehicleCreationException;
import com.example.springhandson3.repository.Inventory;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

import static com.example.springhandson3.util.Constants.*;

@Slf4j
@Service
public class VehicleService {

    private final TyreService tyreService;
    private final SpeakerService speakerService;
    private final Inventory inventory;
    private final LocationService locationService;

    @Autowired
    public VehicleService(Inventory inventory, SpeakerService speakerService,TyreService tyreService,LocationService locationService){
        this.inventory=inventory;
        this.locationService=locationService;
        this.speakerService=speakerService;
        this.tyreService=tyreService;
    }
    @PostConstruct
    public void init() {
        log.info("=================================== Initialized a Vehicle Service ================================");
    }
    public Vehicle mapDtoToVehicle(VehicleRequestDto vehicleRequestDto){
        log.debug("Map to vehicle called");
        Location location;
        Tyre tyre;
        Speaker speaker;
        if(vehicleRequestDto.getLocation().equals(BENGALURU)){
            location=locationService.getLocationBengaluru();
        }
        else if(vehicleRequestDto.getLocation().equals(MUMBAI)){
            location=locationService.getLocationMumbai();
        }
        else{
            location = null;
        }

        if(vehicleRequestDto.getTyre().equals(MRF)){
            tyre = tyreService.getMRFTyre();
        }
        else if(vehicleRequestDto.getTyre().equals(BRIDGESTONE)){
            tyre = tyreService.getBridgestoneTyre();
        }else{
            tyre =null;
        }

        if(vehicleRequestDto.getSpeaker().equals(SONY)){
            speaker = speakerService.getSonySpeaker();
        }
        else if(vehicleRequestDto.getSpeaker().equals(BOSE)){
            speaker = speakerService.getBoseSpeaker();
        }
        else{
            speaker =null;
        }

        if(location ==null || speaker==null || tyre==null){
            throw new InvalidVehicleCreationException(vehicleRequestDto.getTyre(), vehicleRequestDto.getLocation(),vehicleRequestDto.getSpeaker());
        }

        double vehiclePrice = (tyre.getPrice() + speaker.getPrice() + Math.random() * 1000)*(1+(location.getTransportPercentage()/100));


        return new Vehicle(tyre,speaker,vehiclePrice);
    }

    public VehicleResponseDto mapVehicleToVehicleResponseDto(Vehicle vehicle){
        log.debug("Map vehicle to vehicle response dto called");
        if(vehicle==null){
            return null;
        }
        return new VehicleResponseDto(vehicle.getTyre().getBrand(),vehicle.getSpeaker().getBrand(),vehicle.getPrice());
    }

    public VehicleResponseDto addVehicle(VehicleRequestDto vehicleRequestDto){
        log.debug("Add Vehicle called");
        Vehicle vehicle = mapDtoToVehicle(vehicleRequestDto);
        if(vehicle!=null){
            inventory.addVehicle(vehicle);
        }
        return mapVehicleToVehicleResponseDto(vehicle);
    }

    public VehicleResponseDto getVehicle(int index){
        log.debug("get vehicle called");
        return mapVehicleToVehicleResponseDto(inventory.getVehicleByIndex(index));
    }

    public VehicleResponseDto updateByIndex(int index, VehicleRequestDto vehicleRequestDto){
        log.debug("update by index called");
        Vehicle vehicle = mapDtoToVehicle(vehicleRequestDto);
        if(vehicle!=null){
            inventory.updateByIndex(index,vehicle);
        }
        return mapVehicleToVehicleResponseDto(vehicle);
    }

    public VehicleResponseDto deleteVehicle(int index){
        log.debug("delete vehicle called");
        return mapVehicleToVehicleResponseDto(inventory.removeByIndex(index));
    }


    public VehicleResponseDto search(String expense){
        log.debug("Search called");
        if(expense.equals("most")){
            return mapVehicleToVehicleResponseDto(mostExpensiveVehicle());
        }
        else if(expense.equals("least")){
            return mapVehicleToVehicleResponseDto(mostCheapVehicle());
        }

        return null;
    }

    public Vehicle mostExpensiveVehicle() {
        log.debug("Most expensive vehicle called");
        return inventory.getVehicles().stream()
                .max(Comparator.comparingDouble(Vehicle::getPrice))
                .orElse(null);
    }

    public Vehicle mostCheapVehicle(){
        log.debug("Most cheap vehicle called");
        return inventory.getVehicles().stream().min(Comparator.comparingDouble(Vehicle::getPrice)).orElse(null);
    }


    public List<Vehicle> getInventory(){
        return inventory.getVehicles();
    }
}

