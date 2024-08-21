package com.example.databasehandson.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ShiftType  {
    String id;
    String name;
    String description;
    Boolean active;
    String createdBy;
    Timestamp updatedAt;
    String updatedBy;
    String timeZone;
    String tenantId;
}
