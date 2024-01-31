package com.example.databasehandson.entity;

import lombok.Data;

import java.sql.Time;
import java.util.UUID;

@Data
public class Tenant {
    UUID tenantId;
    String name;
    String createdBy;
    Time updatedAt;
    String updateBy;
    String timeZone;
}
