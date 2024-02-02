package com.example.assesment2.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    String fullName;
    String email;
    String password;

    @OneToMany
    List<Address> addresses;

    @OneToOne
    Cart cart;

}
