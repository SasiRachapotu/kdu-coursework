package com.example.jpahandson.service;

import com.example.jpahandson.model.Shift;
import com.example.jpahandson.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ShiftService {

    ShiftRepository shiftRepository;

    @Autowired
    public ShiftService(ShiftRepository shiftRepository){
        this.shiftRepository=shiftRepository;
    }

    public List<Shift> getAllShifts(){
        return shiftRepository.findAll();
    }

    public Shift addShift(Shift shift){
        return shiftRepository.save(shift);
    }

    public List<Shift> getTop3() {
        LocalDate dateStart = LocalDate.of(2023,1,1);
        LocalDate dateEnd = LocalDate.of(2023,1,25);

        return shiftRepository.findTop3Shifts(dateStart,dateEnd);
    }
}
