package com.example.jpahandson.dao;

import com.example.jpahandson.model.User;
import com.example.jpahandson.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public class UserDao {

    UserRepository userRepository;
    @Autowired
    public UserDao(UserRepository userRepository){
        this.userRepository=userRepository;
    }
    public Page<User> getAllUsers(Pageable pageable){
        return userRepository.findAll(pageable);
    }

    public User addUser(User user){
        return userRepository.save(user);
    }

    public void editUser(UUID id,String name){
        userRepository.updateUserDetailsNativeQuery(id,name);
    }
}
