package com.example.databasehandson.entity;

import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class Shift {
    String id;
    String shiftTypeId;
    String name;
    Date startDate;
    Date endDate;
    Time timeStart;
    Time timeEnd;
    String createdBy;
    Time updatedAt;
    String updateBy;
    String timeZone;
    String tenantId;
}
