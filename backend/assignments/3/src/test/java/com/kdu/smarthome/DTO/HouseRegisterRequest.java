package com.kdu.smarthome.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

//import javax.persistence.Column;

@Builder
@Data
public class HouseRegisterRequest {
    @JsonProperty("address")
    private String address;

    @JsonProperty("house_name")
    private String houseName;

}
