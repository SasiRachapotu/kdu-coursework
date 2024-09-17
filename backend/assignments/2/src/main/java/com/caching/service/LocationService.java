package com.caching.service;


import com.caching.dto.request.ForwardGeoRequestDto;
import com.caching.dto.request.ReverseGeoRequestDto;
import com.caching.dto.response.ForwardGeoResponseDto;
import com.caching.dto.response.ReverseGeoResponseDto;

public interface LocationService {

    public ForwardGeoResponseDto getLocationByAddress(ForwardGeoRequestDto forwardGeoRequestDto);
    public ReverseGeoResponseDto getLocationByLatitudeAndLongitude(ReverseGeoRequestDto reverseGeoRequestDto);
}
