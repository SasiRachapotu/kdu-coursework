package com.example.securitydemo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class UserRequestDto {
    @NotBlank
    String userName;
    @NotBlank
    String email;
    @NotBlank
    String password;
}
