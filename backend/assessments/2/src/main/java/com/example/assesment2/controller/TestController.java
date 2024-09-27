package com.example.assesment2.controller;

import com.example.assesment2.entity.UserTest;
import com.example.assesment2.repository.UserTestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    UserTestRepo userTestRepo;

    @Autowired
    public TestController(UserTestRepo userTestRepo){
        this.userTestRepo=userTestRepo;
    }
    @GetMapping("/test")
    public ResponseEntity<String> addAndget(){
        UserTest user = new UserTest();
        user.setName("sasi");
        userTestRepo.save(user);
        return ResponseEntity.ok("Hello");
    }
}
