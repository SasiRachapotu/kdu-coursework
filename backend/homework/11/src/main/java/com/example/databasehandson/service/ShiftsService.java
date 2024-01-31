package com.example.databasehandson.service;

import com.example.databasehandson.dao.ShiftsDao;
import com.example.databasehandson.dto.request.ShiftsDto;
import com.example.databasehandson.entity.Shift;
import com.example.databasehandson.exception.custom.EntityNotCreatedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class ShiftsService {

    ShiftsDao shiftsDao;

    @Autowired
    public ShiftsService(ShiftsDao shiftsDao){
        this.shiftsDao = shiftsDao;
    }

    @Transactional
    public void addShift(ShiftsDto shiftsDto){
        int res = shiftsDao.addShift(shiftsDto);
        if(res!=1){
            throw new EntityNotCreatedException("Shift was not created..");
        }
        log.info("Shift added: with response from jdbc: "+res);
    }

    public Shift getShiftByName(String name){
        return shiftsDao.getShift(name);
    }
}
