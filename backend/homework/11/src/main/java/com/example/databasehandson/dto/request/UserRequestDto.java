package com.example.databasehandson.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class UserRequestDto {
    String username;
    String createdBy;
    String updatedBy;
    String timeZone;
    String tenantName;
}
