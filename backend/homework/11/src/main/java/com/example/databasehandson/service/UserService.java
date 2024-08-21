package com.example.databasehandson.service;

import com.example.databasehandson.dao.UserDao;
import com.example.databasehandson.dto.request.UserRequestDto;
import com.example.databasehandson.entity.Users;
import com.example.databasehandson.exception.custom.EntityNotCreatedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class UserService {

    UserDao userDao;

    @Autowired
    public UserService(UserDao userDao){
        this.userDao=userDao;
    }

    @Transactional
    public void addUser(UserRequestDto userRequestDto, String name){
        int res = userDao.addUser(userRequestDto,name);
        if(res!=1){
            throw new EntityNotCreatedException("Shift was not created..");
        }
        log.info("User added response from jdbc: "+res);
    }

    public Users getUser(String name){
        return userDao.getUser(name);
    }

    public List<Users> getAllUsers(){
       return userDao.getAllUsers();
    }
}
