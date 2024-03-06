package com.kdu.smarthome.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequestDto {
    @NotBlank(message = "Username should not be empty")
    String username;
    @NotBlank(message = "password should not be empty")
    String password;
    @NotBlank(message = "name should not be empty")
    String name;
    @NotBlank(message = "firstname should not be empty")
    String firstName;
    @NotBlank(message = "lastname should not be empty")
    String lastName;
    @NotBlank(message = "emailId should not be empty")
    String emailId;
}
