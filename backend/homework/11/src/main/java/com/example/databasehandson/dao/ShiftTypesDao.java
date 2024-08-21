package com.example.databasehandson.dao;

import com.example.databasehandson.dto.request.ShiftTypeRequestDto;
import com.example.databasehandson.entity.ShiftType;
import com.example.databasehandson.entity.Tenant;
import com.example.databasehandson.util.ShiftTypeRowMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Repository
@Slf4j
public class ShiftTypesDao {
    JdbcTemplate jdbcTemplate;
    TenantDao tenantDao;

    @Autowired
    public ShiftTypesDao(JdbcTemplate jdbcTemplate, TenantDao tenantDao){
        this.jdbcTemplate=jdbcTemplate;
        this.tenantDao = tenantDao;
    }

    public int addShiftTypes(ShiftTypeRequestDto shiftTypeRequestDto){
        Tenant tenant = tenantDao.getTenant(shiftTypeRequestDto.getTenantName());
        String sql = "INSERT INTO shift_types(uq_name,description,active,created_by,updated_at,updated_by,time_zone,tenant_id) VALUES (?,?,?,?,?,?,?,?)";
        int result = jdbcTemplate.update(sql,shiftTypeRequestDto.getName(),shiftTypeRequestDto.getDescription(),shiftTypeRequestDto.getActive(),shiftTypeRequestDto.getCreatedBy(), Timestamp.valueOf(LocalDateTime.now()),shiftTypeRequestDto.getUpdatedBy(),shiftTypeRequestDto.getTimezone(),tenant.getTenantId());
        log.info("Shift Type added...");
        return result;
    }

    public ShiftType getShiftType(String name){
        String sql = "SELECT * FROM shift_types WHERE uq_name = ?";
        return jdbcTemplate.queryForObject(sql,new ShiftTypeRowMapper(),name);
    }
}
