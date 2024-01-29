package com.example.securitydemo.repository;

import com.example.securitydemo.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@Slf4j
public class UserRepository {

    List<User> users;
    UserRepository(){
        users = new ArrayList<>();
    }

    public List<User> getAllUsers(){
        return users;
    }


    public User getByName(String name){
        return users.stream().filter(user->user.getUserName().equals(name)).findFirst().orElse(null);
    }

    public void addUser(User user){
        if(users.stream().filter(u->u.getUserName().equals(user.getUserName())).findFirst().orElse(null)!=null){
            log.info("User already exists...");
        }
        else{
            users.add(user);
        }
    }
}
