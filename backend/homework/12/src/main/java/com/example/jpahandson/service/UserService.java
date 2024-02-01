package com.example.jpahandson.service;

import com.example.jpahandson.dao.TenantDao;
import com.example.jpahandson.dao.UserDao;
import com.example.jpahandson.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;


@Service
public class UserService {

    UserDao userDao;
    TenantDao tenantDao;

    @Autowired
    public UserService(UserDao userDao,TenantDao tenantDao){
        this.userDao=userDao;
        this.tenantDao=tenantDao;
    }

    public Page<User> getAllUsers(int page ,int size){
        if(page<0){
            page=0;
        }
        if(size<1){
            size=1;
        }
        else if(size>50){
            size=50;
        }

        Pageable pageable = PageRequest.of(page,size);
        return userDao.getAllUsers(pageable);
    }

    @Transactional
    public User addUser(User user){
        return userDao.addUser(user);
    }

    @Transactional
    public void editUser(UUID id,String username){
        userDao.editUser(id,username);
    }
}
