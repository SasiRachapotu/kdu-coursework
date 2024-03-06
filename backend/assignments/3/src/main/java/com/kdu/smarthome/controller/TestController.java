package com.kdu.smarthome.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    /**
     * This is controller user for testing purpose and debugging purpose
     * @return
     */

    @GetMapping("/test")
    public ResponseEntity<String> testRoute(){
        return ResponseEntity.ok("Hello world");
    }
}
