package com.example.securitydemo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Person {
    String name;
    String password;
    String role;
}
