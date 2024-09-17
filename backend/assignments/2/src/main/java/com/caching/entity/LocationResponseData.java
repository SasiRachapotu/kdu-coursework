package com.caching.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationResponseData {
    @JsonProperty("distance")
    private double distance;
    @JsonProperty("latitude")
    private double latitude;
    @JsonProperty("longitude")
    private double longitude;
    @JsonProperty("type")
    private String type;
    @JsonProperty("name")
    private String name;
    @JsonProperty("number")
    private int number;
    @JsonProperty("postal_code")
    private int postalCode;
    @JsonProperty("street")
    private String street;
    @JsonProperty("confidence")
    private int confidence;
    @JsonProperty("region")
    private String region;
    @JsonProperty("region_code")
    private String regionCode;
    @JsonProperty("county")
    private String county;
    @JsonProperty("locality")
    private String locality;
    @JsonProperty("administrative_area")
    private String administrativeArea;
    @JsonProperty("neighbourhood")
    private String neighbourhood;
    @JsonProperty("country")
    private String country;
    @JsonProperty("country_code")
    private String countryCode;
    @JsonProperty("continent")
    private String continent;
    @JsonProperty("label")
    private String label;

    @Override
    public String toString() {
        return "LocationResponseData{" +
                "latitude=" + latitude +
                ", longitude=" + longitude +
                ", type='" + type + '\'' +
                ", name='" + name + '\'' +
                ", number=" + number +
                ", postalCode=" + postalCode +
                ", street='" + street + '\'' +
                ", confidence=" + confidence +
                ", region='" + region + '\'' +
                ", regionCode='" + regionCode + '\'' +
                ", county='" + county + '\'' +
                ", locality='" + locality + '\'' +
                ", administrativeArea='" + administrativeArea + '\'' +
                ", neighbourhood='" + neighbourhood + '\'' +
                ", country='" + country + '\'' +
                ", countryCode='" + countryCode + '\'' +
                ", continent='" + continent + '\'' +
                ", label='" + label + '\'' +
                '}';
    }
}
