package com.kdu.smarthome.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class House {
    @Id
    @Column(name ="house_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    private String houseName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users admin;

    @OneToMany()
    private List<Users> houseMembers = new ArrayList<>();

    @OneToMany()
    private List<Room> rooms = new ArrayList<>();

    @OneToMany()
    private List<Device> devices = new ArrayList<>();

    @Column(name = "created_date")
    @CreationTimestamp
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @Column(name = "deleted_date")
    private LocalDateTime deletedDate;

    // Override the toString function so that while printing the object it doesn't go in infinite loop
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("House{");
        sb.append("id=").append(id);
        sb.append(", address='").append(address).append('\'');
        sb.append(", houseName='").append(houseName).append('\'');
        sb.append(", admin=").append(admin != null ? admin.getId() : "null");

        // Iterate through rooms and devices
        sb.append(", rooms=[");
        for (Room room : rooms) {
            sb.append(room.getId()).append(", ");
            sb.append(room.getRoomName()).append(", ");
        }
        sb.append("]");

        sb.append(", devices=[");
        for (Device device : devices) {
            sb.append(device.getId()).append(", ");
            sb.append(device.getDeviceUsername()).append(", ");
            sb.append(device.getKickstonId()).append(", ");
        }
        sb.append("]");

        sb.append(", createdDate=").append(createdDate);
        sb.append(", modifiedDate=").append(modifiedDate);
        sb.append(", deletedDate=").append(deletedDate);
        sb.append('}');
        return sb.toString();
    }


}
