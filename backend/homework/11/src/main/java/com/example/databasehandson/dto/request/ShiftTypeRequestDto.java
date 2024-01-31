package com.example.databasehandson.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShiftTypeRequestDto {
    String name;
    String description;
    Boolean active;
    String createdBy;
    String updatedBy;
    String timezone;
    String tenantName;
}
