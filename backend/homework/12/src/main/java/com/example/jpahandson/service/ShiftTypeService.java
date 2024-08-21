package com.example.jpahandson.service;

import com.example.jpahandson.exception.custom.InvalidShiftTypeException;
import com.example.jpahandson.model.ShiftType;
import com.example.jpahandson.repository.ShiftTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShiftTypeService {
    ShiftTypeRepository shiftTypeRepository;

    @Autowired
    public ShiftTypeService(ShiftTypeRepository shiftTypeRepository){
        this.shiftTypeRepository=shiftTypeRepository;
    }

    public List<ShiftType> getAllShifts(){
        return shiftTypeRepository.findAll();
    }

    public ShiftType addShift(ShiftType shift){
        if(!(shift.getUniqueName().equals("Morning")|| shift.getUniqueName().equals("Evening") || shift.getUniqueName().equals("Afternoon"))){
            throw new InvalidShiftTypeException();
        }
        return shiftTypeRepository.save(shift);
    }
}
