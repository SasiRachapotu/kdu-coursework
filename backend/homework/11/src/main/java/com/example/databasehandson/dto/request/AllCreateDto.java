package com.example.databasehandson.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
@AllArgsConstructor
public class AllCreateDto {
    String username;
    String createdBy;
    String updatedBy;
    String timezone;
    String uqName;
    String typeDescription;
    Boolean typeActive;
    String shiftName;
    Date shiftStart;
    Date shiftEnd;
    Time timeStart;
    Time timeEnd;
    String tenantName;
}
