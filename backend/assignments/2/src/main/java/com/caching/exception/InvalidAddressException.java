package com.caching.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class InvalidAddressException extends RuntimeException {
    final String message;
    final int status;

    @Override
    public String toString() {
        return "Exception: "+message+" Status code: "+status;
    }
}
