package org.example;

import org.example.beans.VehicleService;
import org.example.config.ServicesConfig;
import org.example.entity.Vehicle;
import org.example.logging.Logging;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        Logging logging = new Logging();
        // Created Beans using @Component annotation
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext("org.example.beans");
        VehicleService vehicleService = context.getBean(VehicleService.class);
        List<Vehicle> array = vehicleService.getVehicles();
        logging.logString("======================================================================");
        logging.logString("All Vehicles are: ");
        array.forEach(vehicle -> logging.logString(vehicle.toString()));
        logging.logString("==============Most Expensive Vehicles is======================");
        logging.logString(vehicleService.mostExpensiveVehicle().toString());

        //Created Beans using @Beans annotation
        AnnotationConfigApplicationContext context2 = new AnnotationConfigApplicationContext(ServicesConfig.class);
        VehicleService vehicleService2 = context2.getBean(VehicleService.class);
        logging.logString("======================================================================");
        logging.logString("All Vehicles are: ");
        vehicleService2.getVehicles().forEach(x-> logging.logString(x.toString()));
        logging.logString("The Most Expensive Vehicle is: ");
        logging.logString(vehicleService2.mostExpensiveVehicle().toString());

    }
}