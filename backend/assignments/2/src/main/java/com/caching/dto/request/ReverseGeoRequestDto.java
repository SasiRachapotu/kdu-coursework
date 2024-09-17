package com.caching.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReverseGeoRequestDto {
    Double latitude;
    Double longitude;
}
