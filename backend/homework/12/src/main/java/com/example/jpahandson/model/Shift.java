package com.example.jpahandson.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.sql.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "shifts")
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "shift_type_id")
    private ShiftType shiftType;

    private String name;

    @Column(name = "date_start")
    private Date dateStart;

    @Column(name = "date_end")
    private Date dateEnd;

    @Column(name = "time_start")
    private Time timeStart;

    @Column(name = "time_end")
    private Time timeEnd;

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
