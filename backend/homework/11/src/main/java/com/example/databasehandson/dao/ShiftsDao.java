package com.example.databasehandson.dao;

import com.example.databasehandson.dto.request.ShiftsDto;
import com.example.databasehandson.entity.Shift;
import com.example.databasehandson.entity.ShiftType;
import com.example.databasehandson.entity.Tenant;
import com.example.databasehandson.util.ShiftsRowMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Repository
@Slf4j
public class ShiftsDao {
    JdbcTemplate jdbcTemplate;
    TenantDao tenantDao;
    ShiftTypesDao shiftTypesDao;

    @Autowired
    public ShiftsDao(JdbcTemplate jdbcTemplate, TenantDao tenantDao,ShiftTypesDao shiftTypesDao){
        this.jdbcTemplate=jdbcTemplate;
        this.tenantDao = tenantDao;
        this.shiftTypesDao= shiftTypesDao;
    }

    public int addShift(ShiftsDto shiftsDto){
        Tenant tenant = tenantDao.getTenant(shiftsDto.getTenantName());
        ShiftType shiftType = shiftTypesDao.getShiftType(shiftsDto.getShiftName());
        String sql = "INSERT INTO shifts(shift_type_id,name,date_start,date_end,time_start,time_end,created_at,created_by,updated_at,updated_by,time_zone,tenant_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        int result = jdbcTemplate.update(sql, UUID.fromString(shiftType.getId()),shiftsDto.getName(),shiftsDto.getStartDate(),shiftsDto.getEndDate(),shiftsDto.getStartTime(),shiftsDto.getEndTime(), Timestamp.valueOf(LocalDateTime.now()),shiftsDto.getCreatedBy(), Timestamp.valueOf(LocalDateTime.now()),shiftsDto.getUpdatedBy(),shiftsDto.getTimezone(),tenant.getTenantId());
        log.info("Shift Added successfully");
        return result;
    }

    public Shift getShift(String name){
        String sql = "SELECT * FROM shifts WHERE name = ?";
        return jdbcTemplate.queryForObject(sql,new ShiftsRowMapper(),name);
    }
}
