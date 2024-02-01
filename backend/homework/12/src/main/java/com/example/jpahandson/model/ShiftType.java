package com.example.jpahandson.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "shift_types")
public class ShiftType  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "uq_name")
    private String uniqueName;

    private String description;

    private Boolean active;

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
}
