package com.example.databasehandson.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
@AllArgsConstructor
public class ShiftsDto {
    String shiftName;
    String name;
    Date startDate;
    Date endDate;
    Time startTime;
    Time endTime;
    String createdBy;
    String updatedBy;
    String timezone;
    String tenantName;
}
