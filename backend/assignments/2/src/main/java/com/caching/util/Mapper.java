package com.caching.util;

import com.caching.entity.LocationResponseData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Mapper {

    private Mapper(){

    }
    // Mapper used to map the api response to ApiResponseData and then to LocationResponseData and then return the object
    public static LocationResponseData mapApiResponseToLocationData(String apiResponse1){
        ObjectMapper objectMapper = new ObjectMapper();
        LocationResponseData locationData;
        try {
            ApiResponseData apiResponse = objectMapper.readValue(apiResponse1, ApiResponseData.class);

            if (apiResponse != null && apiResponse.getData() != null && !apiResponse.getData().isEmpty()) {
                locationData = apiResponse.getData().get(0);
                return locationData;
            }
            else{
                return null;
            }
        } catch (JsonProcessingException e) {
            return null;
        }
    }
}
