package org.example;

import org.example.beans.VehicleService;
import org.example.config.ProjectConfig;
import org.example.config.ServicesConfig;
import org.example.entity.Vehicle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import java.util.List;

public class Main {
    private static final Logger logger = LoggerFactory.getLogger(Main.class);
    public static void main(String[] args) {

        // Created Beans using @Component annotation
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(ProjectConfig.class);
        VehicleService vehicleService = context.getBean(VehicleService.class);
        List<Vehicle> array = vehicleService.getVehicles();
        logger.info("======================================================================");
        logger.info("Factory 1 created with location bengaluru and transport percentage as 5.5%: ");
        logger.info("All Vehicles are: ");
        array.forEach(vehicle -> logger.info(vehicle.toString()));
        logger.info("==============Most Expensive Vehicles is======================");
        if(logger.isInfoEnabled()){
            logger.info(vehicleService.mostExpensiveVehicle().toString());
        }
        logger.info("===============Inventory items================================");
        vehicleService.getInventory().forEach(x-> logger.info(x.toString()));
        logger.info("=============================The least expensive vehicle=========================");
        if(logger.isInfoEnabled()){
            logger.info(vehicleService.mostCheapVehicle().toString());
        }

        logger.info("Factory 2 created with location as mumbai and transport percentage as 10.2%: ");
        logger.info("=======================================================================");
        VehicleService vehicleService3= context.getBean(VehicleService.class);
        vehicleService3.getLocation().setPlace("Mumbai");
        vehicleService3.getLocation().setTransportPercentage(10.2);
        vehicleService3.generateVehicleList(10);
        logger.info("==============================Inventory items==============================");
        vehicleService3.getVehicles().forEach(x->logger.info(x.toString()));
        logger.info("==================Most expensive vehicle======================");
        if(logger.isInfoEnabled()){
            logger.info(vehicleService3.mostExpensiveVehicle().toString());
        }
        logger.info("===================Most Cheap Vehicle=========================");
        if(logger.isInfoEnabled()){
            logger.info(vehicleService3.mostCheapVehicle().toString());
        }



        //Created Beans using @Beans annotation
        AnnotationConfigApplicationContext context2 = new AnnotationConfigApplicationContext(ServicesConfig.class);
        VehicleService vehicleService2 = context2.getBean(VehicleService.class);
        logger.info("======================================================================");
        logger.info("All Vehicles are: ");
        vehicleService2.getVehicles().forEach(x-> logger.info(x.toString()));
        logger.info("The Most Expensive Vehicle is: ");
        if(logger.isInfoEnabled()){
            logger.info(vehicleService2.mostExpensiveVehicle().toString());
        }

    }
}