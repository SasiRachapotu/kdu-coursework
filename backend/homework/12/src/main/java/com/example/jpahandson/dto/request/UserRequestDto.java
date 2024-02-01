package com.example.jpahandson.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserRequestDto {
    String username;
    String createdBy;
    String updatedBy;
    String timeZone;
    UUID tenantId;
}
