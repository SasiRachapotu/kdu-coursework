package com.example.assesment2.dto.response;

import com.example.assesment2.entity.Address;
import lombok.Data;

import java.time.LocalDate;

@Data
public class OrderDto {
    LocalDate date;
    Double amount;
    Address address;
}
