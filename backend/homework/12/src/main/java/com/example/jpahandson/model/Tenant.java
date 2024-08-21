package com.example.jpahandson.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "tenants")
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = false, length = 50)
    private String createdBy;

    private Timestamp updatedAt;

    @Column(length = 50)
    private String updatedBy;

    @Column(length = 30)
    private String timeZone;

    @PrePersist
    public void setCreatedAt(){
        createdAt = Timestamp.valueOf(LocalDateTime.now());
    }
}
