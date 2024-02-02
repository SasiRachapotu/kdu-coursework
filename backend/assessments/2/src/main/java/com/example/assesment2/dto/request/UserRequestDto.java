package com.example.assesment2.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class UserRequestDto {
    String fullName;
    String email;
    String password;
    List<RequestAddressDto> addresses;
}
