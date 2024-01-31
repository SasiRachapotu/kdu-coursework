package com.example.databasehandson.entity;

import lombok.Data;

@Data
public class Users {
    String id;
    String username;
    int loggedIn;
    String timeZone;
    String tenantId;
}
