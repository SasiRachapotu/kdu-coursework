package com.example.databasehandson.service;

import com.example.databasehandson.dao.ShiftTypesDao;
import com.example.databasehandson.dto.request.ShiftTypeRequestDto;
import com.example.databasehandson.entity.ShiftType;
import com.example.databasehandson.exception.custom.EntityNotCreatedException;
import com.example.databasehandson.exception.custom.InvalidShiftTypeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShiftTypeService {

    ShiftTypesDao shiftTypesDao;
    @Autowired
    public ShiftTypeService(ShiftTypesDao shiftTypesDao){
        this.shiftTypesDao=shiftTypesDao;
    }

    @Transactional
    public void addShiftTypeService(ShiftTypeRequestDto shiftTypeRequestDto){
        if(!(shiftTypeRequestDto.getName().equals("Morning")|| shiftTypeRequestDto.getName().equals("Evening") || shiftTypeRequestDto.getName().equals("Afternoon"))){
            throw new InvalidShiftTypeException();
        }
        int res = shiftTypesDao.addShiftTypes(shiftTypeRequestDto);
        if(res!=1){
            throw new EntityNotCreatedException("Shift type was not created..");
        }
    }

    public ShiftType getShiftByName(String name){
        return shiftTypesDao.getShiftType(name);
    }
}
