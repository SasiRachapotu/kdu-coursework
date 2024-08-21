package com.example.databasehandson.service;

import com.example.databasehandson.dao.ShiftUserDao;
import com.example.databasehandson.dto.request.UserShiftDto;
import com.example.databasehandson.exception.custom.EntityNotCreatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShiftUserService {

    ShiftUserDao shiftUserDao;

    @Autowired
    public ShiftUserService(ShiftUserDao shiftUserDao){
        this.shiftUserDao=shiftUserDao;
    }

    @Transactional
    public void addShiftUser(UserShiftDto userShiftDto){
        int res = shiftUserDao.addUserShift(userShiftDto);
        if(res!=1){
            throw new EntityNotCreatedException("Shift User was not created..");
        }
    }
}
