package com.kdu.smarthome.exception.custom.device;

public class UnavailableDeviceException extends RuntimeException{
    @Override
    public String toString() {
        return "Unavailable device";
    }
}
