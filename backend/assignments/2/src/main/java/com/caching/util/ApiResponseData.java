package com.caching.util;

import com.caching.entity.LocationResponseData;
import lombok.Data;

import java.util.List;

@Data
public class ApiResponseData {
    private List<LocationResponseData> data;


    @Override
    public String toString() {
        return "ApiResponse{" +
                "data=" + data +
                '}';
    }
}
