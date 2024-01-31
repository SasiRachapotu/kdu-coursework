package com.example.databasehandson.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserShiftDto {
    String createdBy;
    String updatedBy;
    String shiftName;
    String userName;
    String tenantName;
}
