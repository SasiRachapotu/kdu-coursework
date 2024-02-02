package com.example.assesment2.dto.request;

import lombok.Data;

@Data
public class RequestAddressDto {
    Integer id;
    String street;
    String city;
    String state;
    Long postalCode;
    String nickname;

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", street='" + street + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", postalCode=" + postalCode +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
