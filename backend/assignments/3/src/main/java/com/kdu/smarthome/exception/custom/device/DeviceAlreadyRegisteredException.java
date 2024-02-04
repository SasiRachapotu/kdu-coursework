package com.kdu.smarthome.exception.custom.device;

public class DeviceAlreadyRegisteredException extends RuntimeException{
    @Override
    public String toString() {
        return "Device already Registered";
    }
}
