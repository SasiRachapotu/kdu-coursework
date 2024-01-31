package com.example.databasehandson.dao;

import com.example.databasehandson.dto.request.UserShiftDto;
import com.example.databasehandson.entity.Shift;
import com.example.databasehandson.entity.Tenant;
import com.example.databasehandson.entity.Users;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Repository
@Slf4j
public class ShiftUserDao {
    JdbcTemplate jdbcTemplate;
    TenantDao tenantDao;
    ShiftsDao shiftsDao;
    UserDao userDao;

    @Autowired
    public ShiftUserDao(JdbcTemplate jdbcTemplate, TenantDao tenantDao,ShiftsDao shiftsDao,UserDao userDao){
        this.jdbcTemplate=jdbcTemplate;
        this.tenantDao = tenantDao;
        this.shiftsDao=shiftsDao;
        this.userDao=userDao;
    }

    public int addUserShift(UserShiftDto userShiftDto){
        Tenant tenant = tenantDao.getTenant(userShiftDto.getTenantName());
        Users user = userDao.getUser(userShiftDto.getUserName());
        Shift shift = shiftsDao.getShift(userShiftDto.getShiftName());
        String sql = "INSERT INTO shift_user(shift_id,user_id,created_at,created_by,updated_at,updated_by,tenant_id) VALUES (?,?,?,?,?,?,?)";
        int res = jdbcTemplate.update(sql, UUID.fromString(shift.getId()),UUID.fromString(user.getId()), Timestamp.valueOf(LocalDateTime.now()),userShiftDto.getCreatedBy(),Timestamp.valueOf(LocalDateTime.now()),userShiftDto.getUpdatedBy(),tenant.getTenantId());
        log.info("User shift added..");
        return res;
    }
}
