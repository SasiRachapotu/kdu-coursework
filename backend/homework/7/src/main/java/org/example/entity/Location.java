package org.example.entity;

public class Location {
    private String place;
    private double transportPercentage;

    public Location(String place, double transport){
        this.place =place;
        this.transportPercentage=transport;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public double getTransportPercentage() {
        return transportPercentage;
    }

    public void setTransportPercentage(double transportPercentage) {
        this.transportPercentage = transportPercentage;
    }
}
