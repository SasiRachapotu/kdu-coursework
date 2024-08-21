package com.example.springhandson3.repository;


import com.example.springhandson3.entity.Vehicle;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class Inventory {
    private ArrayList<Vehicle> vehicles = new ArrayList<>();

    public void addVehicle(Vehicle vehicle){
        vehicles.add(vehicle);
    }

    public Vehicle getVehicleByIndex(int index){
        return vehicles.get(index);
    }

    public Vehicle removeByIndex(int index){
        Vehicle vehicle = vehicles.get(index);
        vehicles.remove(index);
        return vehicle;
    }

    public Vehicle updateByIndex(int index,Vehicle vehicle){
        vehicles.remove(index);
        vehicles.add(index,vehicle);
        return vehicle;
    }

    public List<Vehicle> getVehicles(){
        return vehicles;
    }
}
