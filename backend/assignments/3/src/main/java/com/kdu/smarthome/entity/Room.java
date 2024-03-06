package com.kdu.smarthome.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Room {
    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomName;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Device> devices = new ArrayList<>();

    @Column(name = "created_date")
    @CreationTimestamp
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(name = "deleted_date")
    private LocalDateTime deletedDate;

    // override the to string function so that while printing the object it doesn't stuck in infinite loop while printing objects in depth
    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomName='" + roomName + '\'' +
                ", devices=" + devices +
                ", createdDate=" + createdDate +
                ", modifiedDate=" + modifiedDate +
                ", deletedDate=" + deletedDate +
                '}';
    }
}
