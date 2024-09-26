package org.example.entity;

public class Vehicle {

    private Tyre tyre;
    private Speaker speaker;
    private double price;

    public Vehicle(Tyre tyre, Speaker speaker, double price) {
        this.tyre = tyre;
        this.speaker = speaker;
        this.price = price;
    }

    public Tyre getTyre() {
        return tyre;
    }

    public void setTyre(Tyre tyre) {
        this.tyre = tyre;
    }

    public Speaker getSpeaker() {
        return speaker;
    }

    public void setSpeaker(Speaker speaker) {
        this.speaker = speaker;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "tyre=" + tyre +
                ", speaker=" + speaker +
                ", price=" + price +
                '}';
    }
}

