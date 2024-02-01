package com.example.jpahandson.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, length = 50)
    private String username;

    private Integer loggedin;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = false, length = 50)
    private String createdBy;

    private Timestamp updatedAt;

    @Column(length = 50)
    private String updatedBy;

    @Column(name = "time_zone", length = 30)
    private String timeZone;

    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @PrePersist
    public void setCreatedAt(){
        createdAt = Timestamp.valueOf(LocalDateTime.now());
    }

    @PostUpdate
    public void setUpdatedAt() {
        updatedAt= Timestamp.valueOf(LocalDateTime.now());
    }
}
