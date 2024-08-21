package com.example.databasehandson.service;

import com.example.databasehandson.dao.*;
import com.example.databasehandson.dto.request.*;
import com.example.databasehandson.entity.Tenant;
import com.example.databasehandson.exception.custom.EntityNotCreatedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TenantService {

    TenantDao tenantDao;
    UserDao userDao;
    ShiftTypesDao shiftTypesDao;
    ShiftsDao shiftsDao;
    ShiftUserDao shiftUserDao;

    public TenantService(TenantDao tenantDao,UserDao userDao,ShiftTypesDao shiftTypesDao,ShiftsDao shiftsDao,ShiftUserDao shiftUserDao){
        this.tenantDao = tenantDao;
        this.userDao=userDao;
        this.shiftsDao=shiftsDao;
        this.shiftTypesDao=shiftTypesDao;
        this.shiftUserDao=shiftUserDao;
    }

    @Transactional
    public void addAll(AllCreateDto allCreateDto){
        int res;
        res =userDao.addUser(new UserRequestDto(allCreateDto.getUsername(),allCreateDto.getCreatedBy(),allCreateDto.getUpdatedBy(),allCreateDto.getTimezone(),allCreateDto.getTenantName()),allCreateDto.getTenantName());
        if(res!=1){
            throw new EntityNotCreatedException("User can't be created with this data");
        }
        res = shiftTypesDao.addShiftTypes(new ShiftTypeRequestDto(allCreateDto.getUqName(), allCreateDto.getTypeDescription(), allCreateDto.getTypeActive(),allCreateDto.getCreatedBy(), allCreateDto.getUpdatedBy(), allCreateDto.getTimezone(), allCreateDto.getTenantName()));
        if(res!=1){
            throw new EntityNotCreatedException("Shift Type can't be created");
        }
        res = shiftsDao.addShift(new ShiftsDto(allCreateDto.getUqName(),allCreateDto.getShiftName(),allCreateDto.getShiftStart(),allCreateDto.getShiftEnd(),allCreateDto.getTimeStart(),allCreateDto.getTimeEnd(),allCreateDto.getCreatedBy(), allCreateDto.getUpdatedBy(), allCreateDto.getTimezone(),allCreateDto.getTenantName()));
        if(res!=1){
            throw new EntityNotCreatedException("Shift can't be created");
        }
        res= shiftUserDao.addUserShift(new UserShiftDto(allCreateDto.getCreatedBy(),allCreateDto.getUpdatedBy(), allCreateDto.getShiftName(),allCreateDto.getUsername(),allCreateDto.getTenantName()));
        if(res!=1){
            throw new EntityNotCreatedException("Shift User can't be created");
        }
    }

    public List<Tenant> getAllTenants(){
        return tenantDao.getAllTenants();
    }
}
