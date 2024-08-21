package com.example.jpahandson.service;

import com.example.jpahandson.exception.custom.UserShiftNotFound;
import com.example.jpahandson.model.ShiftUser;
import com.example.jpahandson.repository.ShiftUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ShiftUserService {
    ShiftUserRepository shiftUserRepository;

    @Autowired
    public ShiftUserService(ShiftUserRepository shiftUserRepository){
        this.shiftUserRepository=shiftUserRepository;
    }

    public List<ShiftUser> getAllShifts(){
        return shiftUserRepository.findAll();
    }

    public void addShift(ShiftUser shift){
        shiftUserRepository.save(shift);
    }

    public ResponseEntity<String > deleteShiftUser(UUID id){
        Optional<ShiftUser> optionalShiftUser = shiftUserRepository.findById(id);
        if(optionalShiftUser.isEmpty()){
            throw new UserShiftNotFound();
        }
        else{
            ShiftUser shiftUser = optionalShiftUser.get();

            Time timestamp = shiftUser.getShift().getTimeEnd();
            Instant instant = timestamp.toInstant();
            LocalDateTime shiftStartTime = LocalDateTime.ofInstant(instant, ZoneId.of("UTC"));

            if (shiftStartTime.getHour() == 23 && shiftStartTime.getMinute() == 0) {
                shiftUserRepository.delete(shiftUser);
                return new ResponseEntity<>("ShiftUser deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("ShiftUser does not start at 23:00 UTC", HttpStatus.BAD_REQUEST);
            }
        }
    }
}
