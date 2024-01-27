package com.caching.service;

import com.caching.util.Mapper;
import com.caching.dto.request.ForwardGeoRequestDto;
import com.caching.dto.request.ReverseGeoRequestDto;
import com.caching.dto.response.ForwardGeoResponseDto;
import com.caching.dto.response.ReverseGeoResponseDto;
import com.caching.exception.InvalidAddressException;
import com.caching.entity.LocationResponseData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


@Service
@Slf4j
public class LocationServiceImpl1 implements LocationService {

    protected static final Map<String, LocalDateTime> forwardGeo= new HashMap<>();

    // The urls are fetched from app.properties
    @Value("${geocoding-url1}")
    String geoCodeUrl;
    @Value("${reverse-geocode-url}")
    String reverseGeoCodeUrl;
    @Override
    @Cacheable(cacheNames = "geocoding",key="#forwardGeoRequestDto.getAddress()",unless = "#result.getRegion().equals('Goa')")
    public ForwardGeoResponseDto getLocationByAddress(ForwardGeoRequestDto forwardGeoRequestDto) {
        log.info("Function executing......");
        log.info("Data not retrieved from cache");

        //rest template for making api call
        RestTemplate restTemplate = new RestTemplate();

        // Url from app.properties
        String jsonResponse = restTemplate.getForObject(
                geoCodeUrl,
                String.class,
                forwardGeoRequestDto.getAddress()
        );
        log.info(jsonResponse);
        // Mapping api response to locationResponseData object
        LocationResponseData locationResponseData = Mapper.mapApiResponseToLocationData(jsonResponse);

        // Handling null pointer exception
        if(locationResponseData == null){
            throw new InvalidAddressException("Invalid Address",404);
        }

        // Demonstrated how manually also cache eviction can be used
        forwardGeo.put(forwardGeoRequestDto.getAddress(), LocalDateTime.now());
        if(forwardGeo.size()>10) {
            Map.Entry<String, LocalDateTime> entry = Collections.min(forwardGeo.entrySet(), Map.Entry.comparingByValue());
            if(entry.getValue().plusMinutes(15).isBefore(LocalDateTime.now())){
                evictCache(forwardGeoRequestDto.getAddress());
            }
        }

        return new ForwardGeoResponseDto(locationResponseData.getLatitude(),locationResponseData.getLongitude(),locationResponseData.getRegion());
    }

    @Override
    @Cacheable(cacheNames = "reverse-geocoding", key = "{#reverseGeoRequestDto.getLatitude(),#reverseGeoRequestDto.getLongitude()}")
    public ReverseGeoResponseDto getLocationByLatitudeAndLongitude(ReverseGeoRequestDto reverseGeoRequestDto) {
        log.info("Data not retrieved from cache");
        log.info("Function executing......");
        RestTemplate restTemplate = new RestTemplate();

        // Url from app.properties
        String jsonResponse = restTemplate.getForObject(
                reverseGeoCodeUrl,
                String.class,
                reverseGeoRequestDto.getLatitude(),
                reverseGeoRequestDto.getLongitude()
        );
        // Mapping api response to locationResponseData object
        LocationResponseData locationResponseData = Mapper.mapApiResponseToLocationData(jsonResponse);
        if(locationResponseData == null){
            throw new InvalidAddressException("Invalid latitude and longitude",404);
        }
        log.debug(Double.toString(locationResponseData.getDistance()));
        log.info(jsonResponse);
        return new ReverseGeoResponseDto(locationResponseData.getLabel());
    }

    @CacheEvict(value="geocoding", key ="#key")
    public void evictCache(String key){
        // This method is just for cache eviction
        log.info("Cache evicted: "+key);
    }


}
